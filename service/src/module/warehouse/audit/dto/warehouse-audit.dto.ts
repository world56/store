import {
  PickType,
  ApiProperty,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { QueryDTO } from '@/dto/common/query.dto';
import { IsOptional, IsString } from 'class-validator';
import { WarehouseAuditDTO } from '@/dto/warehouse/audit.dto';

/**
 * @name WarehouseAuditQueryListDTO 查询仓储审核信息
 */
export class WarehouseAuditQueryListDTO extends IntersectionType(
  PartialType(
    PickType(WarehouseAuditDTO, [
      'type',
      'status',
      'auditTime',
      'createTime',
      'operatorId',
    ] as const),
  ),
  PickType(QueryDTO, ['pageSize', 'currentPage']),
) {
  @ApiProperty({ description: '流水号' })
  @IsOptional()
  @IsString()
  seq?: string;

  take: number;
  skip: number;
}
