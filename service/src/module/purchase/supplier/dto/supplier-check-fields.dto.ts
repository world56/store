import { PickType } from '@nestjs/swagger';
import { PurchaseSupplierDTO } from '@/dto/purchase-supplier.dto';

/**
 * @name SupplierCheckFieldsDTO 检查供应商字段重复
 */
export class SupplierCheckFieldsDTO extends PickType(PurchaseSupplierDTO, [
  'id',
  'name',
] as const) {}
