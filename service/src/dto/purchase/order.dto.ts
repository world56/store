import {
  IsInt,
  IsDate,
  IsEnum,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ENUM_PURCHASE } from '@/enum/purchase';
import { CommonDTO } from '../common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * @name PruchaseOrderProductDetailsDTO 采购订单
 */
export class PruchaseOrderProductDetailsDTO extends PickType(CommonDTO, [
  'id',
  'remark',
] as const) {
  /**
   * @param unitPrice 采购单价
   */
  @Type(() => Number)
  @IsInt()
  unitPrice: number;

  /**
   * @param quantity 采购数量
   */
  @ApiProperty({ description: '采购数量' })
  @Type(() => Number)
  @IsInt()
  quantity: number;

  /**
   * @param productId 产品ID
   */
  @ApiProperty({ description: '供应产品ID' })
  @Type(() => Number)
  @IsInt()
  productId: number;

  /**
   * @param productOrderId 采购订单ID
   */
  @ApiProperty({ description: '采购订单ID' })
  @Type(() => Number)
  @IsInt()
  productOrderId: number;
}

/**
 * @name PurchaseOrderDTO 采购订单DTO
 */
export class PurchaseOrderDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'status',
  'remark',
] as const) {
  /**
   * @param estimatedDate 预期抵达时间
   */
  @ApiProperty({ description: '预计送达时间' })
  @IsOptional()
  @IsDate()
  estimatedDate: Date;

  /**
   * @param settlement 结算方式
   */
  @ApiProperty({ description: '结算方式' })
  @IsEnum(ENUM_PURCHASE.SUPPLIER_SETTLEMENT)
  settlement: ENUM_PURCHASE.SUPPLIER_SETTLEMENT;

  /**
   * @param shippingMethod 发货方式
   */
  @ApiProperty({ description: '发货方式' })
  @IsEnum(ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD)
  shippingMethod: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD;

  /**
   * @param shippingNoteNumber 物流公司ID
   */
  @ApiProperty({ description: '物流公司ID' })
  @IsOptional()
  @IsNumber()
  logisticsCompanyId?: number;

  /**
   * @param shippingNoteNumber 运输单号
   */
  @ApiProperty({ description: '运输单号' })
  @IsOptional()
  @IsString()
  shippingNoteNumber: number;

  /**
   * @param supplierId 供应商ID
   */
  @ApiProperty({ description: '供应商ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId: number;

  /**
   * @name  product 采购产品列表
   */
  @ApiProperty({ description: '采购产品列表' })
  @ValidateNested({ each: true })
  @Type(() => PruchaseOrderProductDetailsDTO)
  @IsArray()
  product: PruchaseOrderProductDetailsDTO[];
}
