import { CommonDTO } from '../common/common.dto';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * @name ProductSpecParameterDTO 规格详情
 */
export class ProductSpecParameterDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'remark',
] as const) {}

/**
 * @name ProductSpecDTO 产品规格
 */
export class ProductSpecDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'status',
  'remark',
] as const) {
  /**
   * @param parameter 规格id
   */
  @ApiProperty({ description: '规格参数ID' })
  @IsOptional()
  @IsInt({ each: true })
  parameter?: number[];
}
