import { QueryDTO } from '@/dto/common/query.dto';
import { WarehousingDTO } from '@/dto/warehouse/wahousing';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name WarehousingQueryList 待入库列表查询
 */
export class WarehousingQueryList extends IntersectionType(
  PartialType(
    PickType(WarehousingDTO, [
      'type',
      'status',
      'orderId',
      'creatorId',
      'inspectorId',
    ] as const),
  ),
  PickType(QueryDTO, ['updateTime', 'pageSize', 'currentPage'] as const),
) {
  take: number;
  skip: number;
}
