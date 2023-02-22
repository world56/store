import { QueryDTO } from '@/dto/common/query.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { WarehousingDTO } from '@/dto/warehouse/wahousing.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name WarehousingQueryList 待入库列表查询
 */
export class WarehousingQueryList extends IntersectionType(
  IntersectionType(
    PickType(PurchaseOrderDTO, ['creatorId'] as const),
    IntersectionType(
      PartialType(
        PickType(WarehousingDTO, [
          'type',
          'orderId',
          'consigneeId',
          'inspectorId',
        ] as const),
      ),
      PickType(QueryDTO, [
        'no',
        'pageSize',
        'updateTime',
        'createTime',
        'currentPage',
      ] as const),
    ),
  ),
  PartialType(PickType(PurchaseOrderDTO, ['status'] as const)),
) {
  take: number;
  skip: number;
}
