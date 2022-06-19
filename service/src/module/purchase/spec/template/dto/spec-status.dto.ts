import { PickType } from '@nestjs/swagger';
import { ProductSpecDTO } from '@/dto/purchase/spec.dto';

/**
 * @name SpecStatusChangeDTO 改变产品规格模板状态
 * @description 被冻结后无法选择
 */
export class SpecStatusChangeDTO extends PickType(ProductSpecDTO, [
  'id',
  'status',
] as const) {}
