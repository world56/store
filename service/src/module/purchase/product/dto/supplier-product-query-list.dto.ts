import {
  PickType,
  ApiProperty,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { QueryDTO } from '@/dto/common/query.dto';
import { IsInt, IsOptional } from 'class-validator';
import { SupplierProductDTO } from '@/dto/purchase/product.dto';

/**
 * @name SupplierProductQueryListDTO 查询供应产品列表
 */
export class SupplierProductQueryListDTO extends IntersectionType(
  PickType(QueryDTO, ['pageSize', 'currentPage'] as const),
  PartialType(PickType(SupplierProductDTO, ['name', 'status'] as const)),
) {
  /**
   * @name branId 品牌ID
   */
  @ApiProperty({ description: '品牌ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  branId: number;

  /**
   * @name supplierId 供应商ID
   */
  @ApiProperty({ description: '供应商ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId: number;

  /**
   * @name categoryId 供应商ID
   */
  @ApiProperty({ description: '类目ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId: number;

  take: number;
  skip: number;
}
