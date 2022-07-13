import { CommonDTO } from '@/dto/common/common.dto';
import { WarehousePositionDTO } from '@/dto/warehouse/position.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name WarehousePositionQueryListDTO 查询货仓列表
 */
export class WarehousePositionQueryListDTO extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize'] as const),
  PartialType(PickType(WarehousePositionDTO, ['name', 'status', 'personId'])),
) {
  take: number;
  skip: number;
}
