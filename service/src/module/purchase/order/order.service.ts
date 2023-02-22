import { LogService } from '@/common/log/log.service';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WarehousingService } from '@/module/warehouse/warehousing/warehousing.service';

import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { PurchaseOrderUpdateDTO } from './dto/pruchase-order-update.dto';
import { PurchaseOrderQueryListDTO } from './dto/purchase-order-query-list.dto';

import { ENUM_COMMON } from '@/enum/common';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';

@Injectable()
export class OrderService {
  public constructor(
    private readonly LogService: LogService,
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
    private readonly WarehousingService: WarehousingService,
  ) {}

  private statistics(products: PurchaseOrderDTO['products']) {
    let total = 0;
    let totalPrice = 0;
    for (const val of products) {
      total += val.quantity || 0;
      totalPrice += parseInt(
        ((val.unitPrice || 0) * (val.quantity || 0)).toString(),
      );
    }
    return { total, totalPrice };
  }

  async getList({ skip, take, ...where }: PurchaseOrderQueryListDTO) {
    const [count, list] = await Promise.all([
      this.PrismaService.purchaseOrder.count({ where }),
      this.PrismaService.purchaseOrder.findMany({
        skip,
        take,
        where,
        include: {
          supplier: true,
          logisticsCompany: true,
          creator: { select: { id: true, name: true } },
          warehousing: { select: { id: true, type: true } },
        },
        orderBy: { createTime: 'desc' },
      }),
    ]);
    return { count, list };
  }

  async getDetails(body: PrimaryKeyDTO) {
    const { id } = body;
    const data = await this.PrismaService.purchaseOrder.findUnique({
      where: { id },
      include: {
        creator: true,
        logisticsCompany: true,
        supplier: { include: { contacts: true } },
        warehousing: { select: { id: true } },
        products: {
          include: {
            spec: true,
            product: {
              include: {
                unit: true,
                brand: true,
                pictures: true,
                spec: {
                  where: { deleted: false },
                  include: { specParameter: true },
                },
              },
            },
          },
        },
      },
    });
    const products = data.products.map((v) => ({
      ...v,
      product: {
        ...v.product,
        spec: v.product.spec.map((v) => v.specParameter),
      },
    }));
    return { ...data, products };
  }

  async insert(dto: PurchaseOrderUpdateDTO, user: AdminUserDTO) {
    const { products, settlement, ...data } = dto;
    data.creatorId = user.id;
    const { total, totalPrice } = this.statistics(products);
    // 根据结算方式 发起对应流程
    const iscashOnDelivery =
      settlement === ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY;
    const info = await this.PrismaService.purchaseOrder.create({
      data: {
        ...data,
        total,
        status: iscashOnDelivery
          ? ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED
          : ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT,
        totalPrice,
        settlement,
        no: `NO${new Date().valueOf()}`,
        products: { createMany: { data: products } },
      },
    });
    if (iscashOnDelivery) {
      await this.WarehousingService.insert({
        orderId: info.id,
        no: info.no,
        type: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.PURCHASE,
        status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.GOODS_TO_BE_RECEIVED,
      });
    }
    this.LogService.insert({
      type: info.status,
      relationId: info.id,
      module: ENUM_COMMON.LOG_MODULE.PURCHASE,
      remark: `新建采购单 ${info.remark ? `：${info.remark}` : ''}`,
    });
    return info;
  }

  async update(dto: PurchaseOrderUpdateDTO) {
    const { id, products, ...data } = dto;
    const next = await this.editable(id);
    if (next) {
      data.remark = data.remark ? data.remark : null;
      data.logisticsCompanyId = data.logisticsCompanyId
        ? data.logisticsCompanyId
        : null;
      const { total, totalPrice } = this.statistics(products);
      const target = await this.PrismaService.purchaseOrder.findUnique({
        where: { id },
        include: { products: true },
      });
      const [update, create] = this.UtilsService.filterGrouping(
        products,
        (v) => v.id,
      );
      const [, deleted] = this.UtilsService.filterArrayRepeatKeys(
        products.map((v) => v.id),
        target.products.map((v) => v.id),
        true,
      );
      const updateData = await this.PrismaService.purchaseOrder.update({
        where: { id },
        data: {
          ...data,
          total,
          totalPrice,
          products: {
            deleteMany: deleted,
            createMany: { data: create },
            updateMany: update.map((data) => ({
              where: { id: data.id },
              data,
            })),
          },
        },
      });
      this.LogService.insert({
        type: updateData.status,
        relationId: updateData.id,
        module: ENUM_COMMON.LOG_MODULE.PURCHASE,
        remark: `更新了采购单 ${data.remark ? `：${data.remark}` : ''}`,
      });
    } else {
      throw new BadRequestException('无法编辑采购单，请确认当前流程是否错误');
    }
  }

  async termination(body: PrimaryKeyDTO) {
    const data = await this.PrismaService.purchaseOrder.update({
      where: { id: body.id },
      data: {
        status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.ABANDONED,
        // TODO 两种情况
        warehousing: {
          update: { status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.ABANDONED },
        },
      },
    });
    this.LogService.insert({
      type: data.status,
      relationId: data.id,
      remark: '终止了采购流程',
      module: ENUM_COMMON.LOG_MODULE.PURCHASE,
    });
    return true;
  }

  /**
   * @name editable 可否编辑(update order)
   */
  async editable(id: number) {
    const { status, settlement } =
      await this.PrismaService.purchaseOrder.findUnique({
        where: { id },
      });
    if (settlement === ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY) {
      return (
        status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED ||
        status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE
      );
    } else {
      return status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT;
    }
  }
}
