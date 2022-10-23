import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { WarehouseAuditQueryListDTO } from './dto/warehouse-audit.dto';

@ApiTags('入库审核')
@Controller('warehouse/audit')
export class AuditController {
  public constructor(private readonly AuditService: AuditService) {}

  @Get('list')
  getList(
    @Query(new QueryListPipe(), new TimeFramePipe(['auditTime', 'createTime']))
    query: WarehouseAuditQueryListDTO,
  ) {
    return this.AuditService.getList(query);
  }
}
