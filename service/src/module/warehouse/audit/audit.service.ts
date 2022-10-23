import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { WarehouseAuditQueryListDTO } from './dto/warehouse-audit.dto';
import { WarehouseAuditDTO } from '@/dto/warehouse/audit.dto';

@Injectable()
export class AuditService {
  public constructor(private readonly PrismaService: PrismaService) {}

  async getList(query: WarehouseAuditQueryListDTO) {
    const { take, skip } = query;
    const where = { take, skip };
    const [count, list] = await Promise.all([
      this.PrismaService.inventoryAudit.count(where),
      this.PrismaService.inventoryAudit.findMany(where),
    ]);
    return { count, list };
  }

  insertAudit(dto: WarehouseAuditDTO) {
    // this.PrismaService.inventoryAudit
  }
}
