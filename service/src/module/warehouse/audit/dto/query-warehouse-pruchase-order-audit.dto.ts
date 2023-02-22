import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @name QueryWarehousePurchaseOrderAuditDTO 查询采购订单入库审核详情
 */
export class QueryWarehousePurchaseOrderAuditDTO {
  @ApiProperty({ description: '仓储入单ID' })
  @IsInt()
  @Type(() => Number)
  warehousingOrderId: number;
}
