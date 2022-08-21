import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PurchaseOrderQueryListDTO } from './dto/purchase-order-query-list.dto';

import { ENUM_WAREHOUSE } from '@/enum/warehouse';
import { ENUM_PURCHASE } from '@/enum/purchase';

@Injectable()
export class OrderService {
  public constructor(
    private readonly UtilsService: UtilsService,
    private readonly PrismaService: PrismaService,
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

  async getList({ skip, take, status, ...query }: PurchaseOrderQueryListDTO) {
    const where = { ...query, warehousing: { status } };
    const [count, list] = await Promise.all([
      this.PrismaService.purchaseOrder.count({ where }),
      this.PrismaService.purchaseOrder.findMany({
        skip,
        take,
        where,
        include: {
          supplier: true,
          logisticsCompany: true,
          warehousing: { select: { status: true } },
          creator: { select: { id: true, name: true } },
        },
        orderBy: { createTime: 'desc' },
      }),
    ]);
    return { count, list };
  }

  // getLogs(query: PrimaryKeyStringDTO) {
  //   const { id } = query;
  //   return this.PrismaService.purchaseOrderLog.findMany({
  //     where: { purchaseOrderId: id },
  //     include: {
  //       voucher: true,
  //       creator: { select: { id: true, name: true, avatar: true } },
  //     },
  //   });
  // }
  // async updateLogistics(query: PurchaseOrderLogInsertDTO, user: AdminUserDTO) {}

  async getDetails(body: PrimaryKeyDTO) {
    const { id } = body;
    const data = await this.PrismaService.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: { include: { contacts: true } },
        creator: true,
        logisticsCompany: true,
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

  insert(dto: PurchaseOrderDTO, user: AdminUserDTO) {
    const { products, settlement, ...data } = dto;
    data.creatorId = user.id;
    const { total, totalPrice } = this.statistics(products);
    // 根据结算方式 发起对应流程
    const status =
      settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY
        ? ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED
        : ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT;
    return this.PrismaService.purchaseOrder.create({
      data: {
        ...data,
        total,
        totalPrice,
        settlement,
        no: `NO${new Date().valueOf()}`,
        products: { createMany: { data: products } },
        warehousing: {
          create: {
            status,
            no: `NO${new Date().valueOf()}`,
            creator: { connect: { id: user.id } },
            type: ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE,
          },
        },
      },
    });
  }

  async update(dto: PurchaseOrderDTO) {
    const { id, products, ...data } = dto;
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
    return this.PrismaService.purchaseOrder.update({
      where: { id },
      data: {
        ...data,
        total,
        totalPrice,
        products: {
          deleteMany: deleted,
          createMany: { data: create },
          updateMany: update.map((data) => ({ where: { id: data.id }, data })),
        },
      },
    });
  }
}
