import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PickType, ApiProperty } from '@nestjs/swagger';
import { SupplierProductQueryListDTO } from './supplier-product-query-list.dto';

/**
 * @name SupplierProductQuery 过滤返回匹配供应产品
 */
export class SupplierProductQuery extends PickType(
  SupplierProductQueryListDTO,
  ['name'] as const,
) {
  /**
   * @name supplierId 供应商ID
   */
  @ApiProperty({ description: '供应商ID' })
  @Type(() => Number)
  @IsInt()
  supplierId: number;
}
