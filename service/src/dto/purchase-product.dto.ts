import { FileDTO } from './file.dto';
import { CommonDTO } from './common.dto';
import { Type } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, ValidateNested } from 'class-validator';

/**
 * @name PurchaseProductDTO 供应商产品库
 */
export class PurchaseProductDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'status',
  'remark',
] as const) {
  /**
   * @param brand 品牌
   */
  @ApiProperty({ description: '品牌' })
  @Type(() => Number)
  @IsInt()
  brandId: number;

  /**
   * @param category 产品类目
   */
  @ApiProperty({ description: '产品类目' })
  @IsInt({ each: true })
  category: number[];

  /**
   * @param unit 计量单位
   */
  @ApiProperty({ description: '计量单位' })
  @Type(() => Number)
  @IsInt()
  unitId: number;

  /**
   * @param supplier 关联供应商
   */
  @ApiProperty({ description: '关联供应商' })
  @Type(() => Number)
  @IsInt({ each: true })
  supplier: number[];

  /**
   * @param picture 图片
   */
  @ApiProperty({ description: '产品图片' })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FileDTO)
  picture: FileDTO[];
}
