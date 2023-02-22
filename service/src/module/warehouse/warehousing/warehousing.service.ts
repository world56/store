import { LogService } from '@/common/log/log.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { WarehousingDTO } from '@/dto/warehouse/wahousing.dto';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';
import { ConfirmPurchaseWarehousingDTO } from './dto/confirm-purchase-warehousing.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';

@Injectable()
export class WarehousingService {
  public constructor(
    private readonly LogService: LogService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList({ take, skip, creatorId, no, ...query }: WarehousingQueryList) {
    const where = { ...query, order: { no, creatorId } };
    const [count, list] = await Promise.all([
      this.PrismaService.warehousing.count({ where }),
      this.PrismaService.warehousing.findMany({
        take,
        skip,
        where,
        orderBy: { createTime: 'desc' },
        include: {
          order: {
            select: { id: true, no: true, status: true, creatorId: true },
          },
        },
      }),
    ]);
    return { count, list };
  }

  getDetails(where: PrimaryKeyDTO) {
    const userProp = { select: { name: true, id: true } };
    return this.PrismaService.warehousing.findUnique({
      where,
      include: {
        consignee: userProp,
        inspector: userProp,
        order: {
          include: {
            supplier: true,
            logisticsCompany: true,
            creator: { select: { name: true } },
            products: {
              include: {
                spec: true,
                product: { include: { brand: true, unit: true } },
              },
            },
          },
        },
      },
    });
  }

  /**
   * @name insert 新增一个入库流程
   * @descrition 其他业务入库也是走这里
   */
  insert(data: WarehousingDTO) {
    return this.PrismaService.warehousing.create({ data });
  }

  async receiving(dto: PrimaryKeyDTO, user: AdminUserDTO) {
    const data = await this.PrismaService.warehousing.update({
      where: { id: dto.id },
      data: {
        consignee: { connect: { id: user.id } },
        status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.WAITING_FOR_STORAGE,
        order: {
          update: {
            status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE,
          },
        },
      },
    });
    this.LogService.insert({
      relationId: data.orderId,
      module: ENUM_COMMON.LOG_MODULE.PURCHASE,
      remark: `确认收货 ${data.remark ? `：${data.remark}` : ''}`,
      type: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.WAITING_FOR_STORAGE,
    });
    return true;
  }

  async confirmWarehousing(
    dto: ConfirmPurchaseWarehousingDTO,
    user: AdminUserDTO,
  ) {
    const { id, remark, products } = dto;
    const next = await this.prepareForReview(dto.id);
    if (next) {
      return this.PrismaService.$transaction(async (prisma) => {
        const info = await prisma.warehousing.update({
          where: { id },
          data: {
            remark: remark ? remark : null,
            inspector: { connect: { id: user.id } },
            status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.UNDER_REVIEW,
            order: {
              update: {
                status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.UNDER_REVIEW,
                products: {
                  updateMany: products.map(({ id, actualQuantity }) => ({
                    where: { id },
                    data: { actualQuantity },
                  })),
                },
              },
            },
          },
          include: { audit: true },
        });
        if (!info.audit) {
          await prisma.warehouseAudit.create({
            data: {
              no: info.no,
              status: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.PENDING,
              type: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.PURCHASE,
              operator: { connect: { id: user.id } },
              warehousing: { connect: { id: dto.id } },
              remark: dto.remark,
            },
          });
        }
        this.LogService.insert({
          relationId: info.orderId,
          module: ENUM_COMMON.LOG_MODULE.PURCHASE,
          type: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.UNDER_REVIEW,
          remark: `确认入库信息 ${info.remark ? `：${info.remark}` : ''}`,
        });
        return info;
      });
    } else {
      throw new BadRequestException('无法确认清点，请确认当前流程是否错误');
    }
  }

  private CASH_ON_DELIVERY = [
    ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE, // 待入库
    ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED, // 待收货
  ];

  private DELIVERY_AFTER_PAYMENT = [
    ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT, // 待付款
    ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED, // 待收货
    ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE, // 待入库
  ];

  /**
   * @name prepareForReview 是否可编辑采购入库单
   */
  async prepareForReview(id: number) {
    const {
      order: { settlement, status },
    } = await this.PrismaService.warehousing.findUnique({
      where: { id },
      include: { order: true },
    });
    return (
      (settlement ===
        ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY &&
        this.CASH_ON_DELIVERY.includes(status)) ||
      (settlement ===
        ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.DELIVERY_AFTER_PAYMENT &&
        this.DELIVERY_AFTER_PAYMENT.includes(status))
    );
  }
}
