import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonDTO } from '@/dto/common.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PurchaseSupplierDTO } from '@/dto/purchase-supplier.dto';

/**
 * @name SupplierQueryListDTO 查询供应商列表
 */
export class SupplierQueryListDTO extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize']),
  PartialType(PickType(PurchaseSupplierDTO, ['name'])),
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
   * @param phone 供应商主销类型
   */
  @ApiProperty({
    description: '供应商联系电话',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  take: number;
  skip: number;
}
