import { Injectable } from '@nestjs/common';
import { LogService } from '@/common/log/log.service';

import { WarehouseAuditDTO } from './dto/warehouse-audit.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehouseAuditQueryListDTO } from './dto/warehouse-audit-query-list.dto';
import { QueryWarehousePurchaseOrderAuditDTO } from './dto/query-warehouse-pruchase-order-audit.dto';

import { ENUM_PURCHASE } from '@/enum/purchase';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';
import { ENUM_COMMON } from '@/enum/common';
import { PurchaseOrder, Warehousing } from '@prisma/client';

@Injectable()
export class AuditService {
  public constructor(
    private readonly LogService: LogService,
    private readonly PrismaService: PrismaService,
  ) {}

  async getList({ take, skip, no, ...params }: WarehouseAuditQueryListDTO) {
    const where = { ...params, warehouseing: no ? { no } : undefined };
    const [count, list] = await Promise.all([
      this.PrismaService.warehouseAudit.count({ where }),
      this.PrismaService.warehouseAudit.findMany({
        take,
        skip,
        where,
        include: {
          warehousing: true,
          operator: { select: { id: true, name: true } },
        },
        orderBy: { createTime: 'desc' },
      }),
    ]);
    return { count, list };
  }

  getAuditPurchase(body: QueryWarehousePurchaseOrderAuditDTO) {
    const userSelect = { id: true, name: true };
    return this.PrismaService.warehousing.findUnique({
      where: { id: body.warehousingOrderId },
      include: {
        audit: true,
        order: {
          include: {
            warehousing: true,
            products: { include: { spec: true, product: true } },
            supplier: { include: { category: true, contacts: true } },
          },
        },
        consignee: { select: userSelect },
        inspector: { select: userSelect },
      },
    });
  }

  /**
   * @description 拒绝：采购、仓储可以重新编辑 warehousingId
   */
  async audit(warehousingId: number, body: WarehouseAuditDTO) {
    const data = await this.PrismaService.warehousing.findUnique({
      where: { id: warehousingId },
      include: { order: true },
    });
    if (body.status === ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.RESOLVED) {
      return this.purchaseApproved(data); // 通过
    }
    return true;
  }

  /**
   * @name purchaseApproved 采购入库 通过审核
   * @description 货到付款：下一步财务付款  先付款在到货：完整采购入库流程
   */
  private async purchaseApproved(data: Warehousing & { order: PurchaseOrder }) {
    const { id, settlement } = data.order;
    if (
      // 货到付款：更新产品数量、入库、审核状态标记为完成、启动付款流程
      settlement === ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY
    ) {
      const update = await this.PrismaService.purchaseOrder.update({
        where: { id },
        data: {
          status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT,
          warehousing: {
            update: {
              status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.COMPLETE,
              audit: {
                update: {
                  status: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.RESOLVED,
                },
              },
            },
          },
        },
        include: { products: true },
      });
      this.LogService.insert({
        type: update.status,
        relationId: update.id,
        module: ENUM_COMMON.LOG_MODULE.PURCHASE,
        remark: `审核通过${update.remark ? `：${update.remark}` : ''}`,
      });
    }

    return true;
  }

  // insertAudit(
  //   dto: Pick<
  //     WarehouseAuditDTO,
  //     'type' | 'operatorId' | 'warehouseingId' | 'remark'
  //   >,
  // ) {
  //   return this.PrismaService.inventoryAudit.create({
  //     data: {
  //       status: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_STATUS.PENDING,
  //       type: dto.type,
  //       operator: { connect: { id: dto.operatorId } },
  //       warehouseing: { connect: { id: dto.warehouseingId } },
  //       remark: dto.remark,
  //     },
  //   });
  // }
}
