import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehousingQueryList } from './dto/warehousing-query-list';

@Injectable()
export class WarehousingService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: WarehousingQueryList) {
    const { take, skip, ...where } = query;
    const [count, list] = await Promise.all([
      this.PrismaService.warehousing.count({ where }),
      this.PrismaService.warehousing.findMany({ where, take, skip }),
    ]);
    return { count, list };
  }
}
