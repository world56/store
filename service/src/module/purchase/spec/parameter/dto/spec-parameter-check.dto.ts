import { PickType } from '@nestjs/swagger';
import { ProductSpecParameterDTO } from '@/dto/purchase/spec.dto';

/**
 * @name SpecParameterCheckFieldsDTO 检查产品规格名称是否重复
 */
export class SpecParameterCheckFieldsDTO extends PickType(
  ProductSpecParameterDTO,
  ['id', 'name'] as const,
) {}
