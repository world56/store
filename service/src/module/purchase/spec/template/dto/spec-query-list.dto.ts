import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonDTO } from '@/dto/common/common.dto';
import { IsInt, IsOptional } from 'class-validator';
import { ProductSpecDTO } from '@/dto/purchase/spec.dto';

/**
 * @name SpecQueryListDTO 查询规格列表
 */
export class SpecQueryListDTO extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize']),
  PartialType(PickType(ProductSpecDTO, ['name', 'status'] as const)),
) {
  /**
   * @param parameterId 规格参数ID
   */
  @ApiProperty({ description: '规格ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parameterId: number;

  take: number;
  skip: number;
}
