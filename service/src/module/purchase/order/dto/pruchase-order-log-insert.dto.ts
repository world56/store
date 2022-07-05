import { PickType } from '@nestjs/swagger';
import { PurchaseOrderDTO } from '@/dto/purchase/order.dto';

/**
 * @name PurchaseOrderLogInsertDTO 更新采购订单物流信息
 */
export class PurchaseOrderLogInsertDTO extends PickType(PurchaseOrderDTO, [
  'id',
  'remark',
] as const) {}
