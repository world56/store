import { QueryDTO } from '@/dto/common/query.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PurchaseOrderQueryListDTO 查询采购订单列表
 */
export class PurchaseOrderQueryListDTO extends IntersectionType(
  PartialType(
    PickType(PurchaseOrderDTO, ['creatorId', 'supplierId', 'id'] as const),
  ),
  PickType(QueryDTO, ['pageSize', 'currentPage', 'createTime'] as const),
) {
  take: number;
  skip: number;
}
