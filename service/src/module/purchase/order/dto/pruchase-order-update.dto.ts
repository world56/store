import {
  PickType,
  OmitType,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';

/**
 * @name PurchaseOrderUpdateDTO 新建采购订单
 */
export class PurchaseOrderUpdateDTO extends IntersectionType(
  OmitType(PurchaseOrderDTO, ['status'] as const),
  PartialType(PickType(PurchaseOrderDTO, ['status'] as const)),
) {}
