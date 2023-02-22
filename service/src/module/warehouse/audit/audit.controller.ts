import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { TimeFramePipe } from '@/pipe/time-frame.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { WarehouseAuditDTO } from './dto/warehouse-audit.dto';
import { WarehouseAuditQueryListDTO } from './dto/warehouse-audit-query-list.dto';
import { QueryWarehousePurchaseOrderAuditDTO } from './dto/query-warehouse-pruchase-order-audit.dto';

@ApiTags('仓储管理-入库审核')
@Controller('warehouse/audit')
export class AuditController {
  public constructor(private readonly AuditService: AuditService) {}

  @ApiOperation({ summary: '获取审核列表' })
  @Get('list')
  getList(
    @Query(new QueryListPipe(), new TimeFramePipe(['auditTime', 'createTime']))
    query: WarehouseAuditQueryListDTO,
  ) {
    return this.AuditService.getList(query);
  }

  @ApiOperation({ summary: '采购审核详情' })
  @Post('purchase')
  getAuditPurchaseDetails(@Body() body: QueryWarehousePurchaseOrderAuditDTO) {
    return this.AuditService.getAuditPurchase(body);
  }

  @ApiOperation({ summary: '编辑审核状态', description: '审核' })
  @Post(':warehousingId')
  audit(
    @Param('warehousingId', new ParseIntPipe()) warehousingId: number,
    @Body() body: WarehouseAuditDTO,
  ) {
    return this.AuditService.audit(warehousingId, body);
  }
}
