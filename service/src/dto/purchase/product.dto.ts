import { Type } from 'class-transformer';
import { FileDTO } from '../common/file.dto';
import { CommonDTO } from '../common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

/**
 * @name SupplierProductDTO 供应商产品库
 */
export class SupplierProductDTO extends PickType(CommonDTO, [
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
   * @param spec 产品规格
   */
  @ApiProperty({ description: '产品规格' })
  @Type(() => Number)
  @IsInt({ each: true })
  spec: number[];

  /**
   * @param pictures 产品实拍资源
   */
  @ApiProperty({ description: '产品实拍资源' })
  @ValidateNested({ each: true })
  @Type(() => FileDTO)
  @IsArray()
  pictures: FileDTO[];
}
