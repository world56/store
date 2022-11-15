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
import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { CommonDTO, PrimaryKeyDTO } from '../common/common.dto';

import { ENUM_PURCHASE } from '@/enum/purchase';

/**
 * @name PurchaseOrderDTO 采购订单DTO
 */
export class PurchaseOrderDTO extends IntersectionType(
  PartialType(PrimaryKeyDTO),
  PickType(CommonDTO, ['remark'] as const),
) {
  /**
   * @param status 采购流程状态
   */
  @ApiProperty({ description: '采购流程状态' })
  @IsEnum(ENUM_PURCHASE.PURCHASE_PROCESS_STATUS)
  @Type(() => Number)
  @IsInt()
  status: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS;

  /**
   * @param estimatedDate 预期抵达时间
   */
  @ApiProperty({ description: '预计送达时间' })
  @IsOptional()
  @IsDate()
  estimatedDate?: Date;

  /**
   * @param settlement 结算方式
   */
  @ApiProperty({ description: '结算方式' })
  @Type(() => Number)
  @IsEnum(ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD)
  settlement: ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD;

  /**
   * @param shippingMethod 发货方式
   */
  @ApiProperty({ description: '发货方式' })
  @Type(() => Number)
  @IsEnum(ENUM_PURCHASE.PURCHASE_SHIPPING_METHOD)
  shippingMethod: ENUM_PURCHASE.PURCHASE_SHIPPING_METHOD;

  /**
   * @param logisticsCompanyId 物流公司ID
   */
  @ApiProperty({ description: '物流公司ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  logisticsCompanyId?: number;

  /**
   * @param shippingNoteNumber 运输单号
   */
  @ApiProperty({ description: '运输单号' })
  @IsOptional()
  @IsString()
  shippingNoteNumber?: string;

  /**
   * @param supplierId 供应商ID
   */
  @ApiProperty({ description: '供应商ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId: number;

  /**
   * @param creatorId 创建人ID
   */
  @ApiProperty({ description: '创建人ID' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  creatorId: number;

  /**
   * @name product 采购产品列表
   */
  @ApiProperty({ description: '采购产品列表' })
  @ValidateNested()
  @Type(() => PurchaseOrderProductDetailsDTO)
  @IsArray()
  products: PurchaseOrderProductDetailsDTO[];
}

/**
 * @name PurchaseOrderProductDetailsDTO 采购产品DTO
 */
export class PurchaseOrderProductDetailsDTO extends IntersectionType(
  PickType(CommonDTO, ['id', 'remark'] as const),
  PickType(PurchaseOrderDTO, ['supplierId'] as const),
) {
  /**
   * @param unitPrice 采购单价
   */
  @ApiProperty({ description: '采购单价' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  unitPrice: number;

  /**
   * @param specId 规格ID
   */
  @ApiProperty({ description: '规格ID' })
  @Type(() => Number)
  @IsInt()
  specId: number;

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
  @IsOptional()
  @IsInt()
  productOrderId: number;
}
