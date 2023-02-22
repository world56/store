import { Type } from 'class-transformer';
import { CommonDTO } from '../common/common.dto';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

/**
 * @name WarehouseAuditDTO 仓储库存审计（审核）
 */
export class WarehouseAuditDTO extends PickType(CommonDTO, [
  'id',
  'remark',
] as const) {
  /**
   * @param type  审核类型
   */
  @ApiProperty({ description: '审核类型', required: true })
  @IsInt()
  @Type(() => Number)
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE)
  type: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE;

  /**
   * @param status 审核状态
   */
  @ApiProperty({ description: '审核状态', required: true })
  @IsInt()
  @Type(() => Number)
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS)
  status: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS;

  /**
   * @param auditTime 审核时间
   */
  @ApiProperty({ description: '最后审核时间' })
  @IsOptional()
  @IsDate()
  auditTime: Date;

  /**
   * @param createTime 创建时间
   */
  @ApiProperty({ description: '创建时间', required: true })
  @IsDate()
  createTime: Date;

  /**
   * @param operatorId 审核操作人
   */
  @ApiProperty({ description: '审核操作人' })
  @IsOptional()
  @IsNumber()
  operatorId: number;

  /**
   * @param warehouseingId 入库单信息
   */
  @ApiProperty({ description: '入库ID' })
  @IsNumber()
  @Type(() => Number)
  warehouseingId: number;
}
