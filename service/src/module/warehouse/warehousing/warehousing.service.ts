import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehousingQueryList } from './dto/warehousing-query-list';

@Injectable()
export class WarehousingService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: WarehousingQueryList) {
    const { take, skip, ...where } = query;
    const [count, list] = await Promise.all([
      this.PrismaService.warehousing.count({ where }),
      this.PrismaService.warehousing.findMany({
        take,
        skip,
        where,
        include: {
          creator: { select: { id: true, name: true } },
          inspector: { select: { id: true, name: true } },
        },
        orderBy: { createTime: 'desc' },
      }),
    ]);
    return { count, list };
  }

  getDetails(where: PrimaryKeyDTO) {
    const userProp = { select: { name: true, id: true } };
    return this.PrismaService.warehousing.findUnique({
      where,
      include: { creator: userProp, inspector: userProp },
    });
  }
}
