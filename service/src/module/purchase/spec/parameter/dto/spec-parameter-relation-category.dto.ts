import { IsInt } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';

/**
 * @name SpecParameterRelationCategoryDTO 关联类目
 */
export class SpecParameterRelationCategoryDTO extends PrimaryKeyDTO {
  /**
   * @param spec 产品规格关联规格类目模板
   */
  @ApiProperty({ description: '产品规格关联规格类目模板' })
  @Optional()
  @IsInt({ each: true })
  spec: number[];
}
