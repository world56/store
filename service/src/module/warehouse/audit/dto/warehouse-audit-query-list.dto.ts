import { QueryDTO } from '@/dto/common/query.dto';
import { WarehouseAuditDTO } from '@/dto/warehouse/audit.dto';
import { PickType, PartialType, IntersectionType } from '@nestjs/swagger';

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
  PickType(QueryDTO, ['pageSize', 'currentPage', 'no']),
) {
  take: number;
  skip: number;
}
