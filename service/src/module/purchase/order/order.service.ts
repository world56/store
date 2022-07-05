import { Injectable } from '@nestjs/common';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { UtilsService } from '@/common/utils/utils.service';
import { PrimaryKeyStringDTO } from '@/dto/common/common.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PurchaseOrderQueryListDTO } from './dto/purchase-order-query-list.dto';

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

  async getList(query: PurchaseOrderQueryListDTO) {
    const { skip, take, id, creatorId, time } = query;
    const where = {
      id,
      creatorId,
      createTime: time
        ? { gte: new Date(time[0]), lt: new Date(time[1]) }
        : undefined,
    };
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

  getDetails(body: PrimaryKeyStringDTO) {
    const { id } = body;
    return this.PrismaService.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: true,
        creator: true,
        logisticsCompany: true,
        products: {
          include: {
            spec: true,
            product: {
              include: {
                unit: true,
                brand: true,
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
  }

  insert(dto: PurchaseOrderDTO, user: AdminUserDTO) {
    const { products, ...data } = dto;
    data.creatorId = user.id;
    const { total, totalPrice } = this.statistics(products);
    return this.PrismaService.purchaseOrder.create({
      data: {
        ...data,
        total,
        totalPrice,
        products: { createMany: { data: products } },
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
