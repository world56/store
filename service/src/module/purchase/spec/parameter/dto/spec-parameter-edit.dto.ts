import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsArray } from 'class-validator';
import { ProductSpecParameterDTO } from '@/dto/product-spec.dto';

/**
 * @name SpecParameterEditDTO 批量新增规格参数
 */
export class SpecParameterEditDTO {
  /**
   * @name parameter 规格参数列表
   */
  @ApiProperty({ description: '规格规则列表' })
  @ValidateNested({ each: true })
  @Type(() => ProductSpecParameterDTO)
  @IsArray()
  parameter: ProductSpecParameterDTO[];
};
