import { LogService } from '@/common/log/log.service';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';
import { ConfirmPurchaseWarehousingDTO } from './dto/confirm-purchase-warehousing.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

@Injectable()
export class WarehousingService {
  public constructor(
    private readonly LogService: LogService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList({ take, skip, ...query }: WarehousingQueryList) {
    const where = {
      ...query,
      AND: {
        order: {
          is: {
            settlement: ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY,
          },
        },
        status: {
          notIn: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT,
        },
      },
    };
    const userSelect = { select: { id: true, name: true } };
    const [count, list] = await Promise.all([
      this.PrismaService.warehousing.count({ where }),
      this.PrismaService.warehousing.findMany({
        take,
        skip,
        where,
        orderBy: { createTime: 'desc' },
        include: { creator: userSelect, inspector: userSelect },
      }),
    ]);
    return { count, list };
  }

  getDetails(where: PrimaryKeyDTO) {
    const userProp = { select: { name: true, id: true } };
    return this.PrismaService.warehousing.findUnique({
      where,
      include: {
        creator: userProp,
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

  async toVoid(dto: PrimaryKeyDTO) {
    const data = await this.PrismaService.warehousing.update({
      where: { id: dto.id },
      data: { status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.ABANDONED },
    });
    this.LogService.insert({
      type: data.status,
      relationId: data.id,
      remark: '终止了采购流程',
      module: ENUM_COMMON.LOG_MODULE.PURCHASE,
    });
    return data;
  }

  async receiving(dto: PrimaryKeyDTO) {
    const data = await this.PrismaService.warehousing.update({
      where: { id: dto.id },
      data: { status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE },
    });
    this.LogService.insert({
      type: data.status,
      remark: '确认收货',
      relationId: data.id,
      module: ENUM_COMMON.LOG_MODULE.PURCHASE,
    });
    return data;
  }

  async confirmWarehousing(
    dto: ConfirmPurchaseWarehousingDTO,
    user: AdminUserDTO,
  ) {
    const { id, remark, products } = dto;
    const next = await this.prepareForReview(dto.id);
    if (next) {
      const info = await this.PrismaService.warehousing.update({
        where: { id },
        data: {
          remark: remark ? remark : null,
          inspector: { connect: { id: user.id } },
          status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.UNDER_REVIEW,
          order: {
            update: {
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
      if (info.audit) {
      }
      this.LogService.insert({
        type: info.status,
        relationId: info.id,
        module: ENUM_COMMON.LOG_MODULE.PURCHASE,
        remark: '确认入库信息 ' + (info.remark || ''),
      });
      return info;
    } else {
      throw new BadRequestException('无法确认清点，请确认当前流程是否错误');
    }
  }

  private CASH_ON_DELIVERY = [
    ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
    ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
  ];

  private DELIVERY_AFTER_PAYMENT = [
    ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT, // 待付款
    ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
    ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
  ];

  /**
   * @name prepareForReview 是否可审批
   */
  async prepareForReview(id: number) {
    const {
      status,
      order: { settlement },
    } = await this.PrismaService.warehousing.findUnique({
      where: { id },
      include: { order: true },
    });
    return (
      (settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY &&
        this.CASH_ON_DELIVERY.includes(status)) ||
      (settlement ===
        ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT &&
        this.DELIVERY_AFTER_PAYMENT.includes(status))
    );
  }
}
