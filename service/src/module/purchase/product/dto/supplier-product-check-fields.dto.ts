import { PartialType, PickType } from '@nestjs/swagger';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';

/**
 * @name SupplierProductCheckFieldsDTO 检查供应商产品是否重复
 */
export class SupplierProductCheckFieldsDTO extends PartialType(
  PickType(SupplierProductDTO, ['id', 'name'] as const),
) {}
