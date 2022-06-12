import { PickType } from '@nestjs/swagger';
import { ProductSpecParameterDTO } from '@/dto/product-spec.dto';

/**
 * @name SpectCheckFieldsDTO 检查字段重复
 */
export class SpectCheckFieldsDTO extends PickType(ProductSpecParameterDTO, [
  'id',
  'name',
]) {}
