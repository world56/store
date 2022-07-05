import { CommonDTO } from '@/dto/common/common.dto';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PurchaseOrderQueryListDTO 查询采购订单列表
 */
export class PurchaseOrderQueryListDTO extends IntersectionType(
  PickType(CommonDTO, ['pageSize', 'currentPage', 'time'] as const),
  PartialType(PickType(PurchaseOrderDTO, ['creatorId', 'id'] as const)),
) {
  take: number;
  skip: number;
}
