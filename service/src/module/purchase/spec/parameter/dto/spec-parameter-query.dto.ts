import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonDTO } from '@/dto/common.dto';
import { IsInt, IsOptional } from 'class-validator';
import { ProductSpecParameterDTO } from '@/dto/product-spec.dto';

/**
 * @name SpecParameterQueryDTO 产品规格参数
 */
export class SpecParameterQueryDTO extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize']),
  PartialType(PickType(ProductSpecParameterDTO, ['name'] as const)),
) {
  /**
   * @param categoryId 规格模板ID
   */
  @ApiProperty({ description: '规格ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId: number;

  take: number;
  skip: number;
}
