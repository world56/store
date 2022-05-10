import { CommonDTO } from '@/dto/common.dto';
import { WarehouseArrangementDTO } from '@/dto/warehouse-arrangement.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name ArrangementQueryListDTO 查询货仓列表
 */
export class ArrangementQueryListDTO extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize'] as const),
  PartialType(PickType(WarehouseArrangementDTO, ['name', 'status'])),
) {
  take: number;
  skip: number;
}
