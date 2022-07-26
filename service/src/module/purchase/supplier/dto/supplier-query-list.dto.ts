import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { QueryDTO } from '@/dto/common/query.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PurchaseSupplierDTO } from '@/dto/purchase/supplier.dto';

/**
 * @name SupplierQueryListDTO 查询供应商列表
 */
export class SupplierQueryListDTO extends IntersectionType(
  PickType(QueryDTO, ['status', 'currentPage', 'pageSize'] as const),
  PartialType(PickType(PurchaseSupplierDTO, ['name'] as const)),
) {
  /**
   * @param category 供应商主销类型
   */
  @ApiProperty({
    description: '供应商主销类型',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category?: number;

  /**
   * @param contactsName 联系人名称
   */
  @ApiProperty({
    description: '联系人名称',
  })
  @IsOptional()
  @IsString()
  contactsName?: string;

  /**
   * @param phone 联系人电话
   */
  @ApiProperty({
    description: '联系人电话',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  /**
   * @param companyPhone 联系人电话
   */
  @ApiProperty({
    description: '公司电话',
  })
  @IsOptional()
  @IsString()
  companyPhone?: string;

  take: number;
  skip: number;
}
