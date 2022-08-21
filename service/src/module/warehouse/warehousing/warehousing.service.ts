import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehousingQueryList } from './dto/warehousing-query-list.dto';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';

@Injectable()
export class WarehousingService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList({ take, skip, ...query }: WarehousingQueryList) {
    const where = {};
    const userSelect = { select: { id: true, name: true } };
    const [count, list] = await Promise.all([
      this.PrismaService.warehousing.count({ where }),
      this.PrismaService.warehousing.findMany({
        take,
        skip,
        where: {
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
        },
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
      include: { order: true, creator: userProp, inspector: userProp },
    });
  }

  // 入库 等待审核
  saveWarehousingInfo() {}
}
