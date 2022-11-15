import { Type } from 'class-transformer';
import { CommonDTO } from '../common/common.dto';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { PurchaseOrderProductDetailsDTO } from '../purchase/order.dto';

import { ENUM_WAREHOUSE } from '@/enum/warehouse';

/**
 * @name WarehousingDTO 采购、售后待入库
 */
export class WarehousingDTO extends PickType(CommonDTO, ['id', 'no']) {
  /**
   * @param orderId 采购单ID
   */
  @ApiProperty({
    description: '关联的采购订单号',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  orderId: number;

  /**
   * @param inspectorId 清点入库人ID
   */
  @ApiProperty({ description: '清点入库人ID' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  inspectorId?: number;

  /**
   * @param inspectorId 清点入库人ID
   */
  @ApiProperty({ description: '收货人' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  consigneeId?: number;

  /**
   * @param status 入库状态
   */
  @ApiProperty({
    title: '入库状态',
    description: '0待收货 1待清点 2完成入库',
  })
  @Type(() => Number)
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS)
  @IsInt()
  status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS;

  /**
   * @param type 待入库类型
   */
  @ApiProperty({
    description: '入库类型（采购、售后、盘点）',
    required: true,
  })
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE)
  @Type(() => Number)
  @IsInt()
  type: number;
}

/**
 * @name PurchaseOrderProductConfirmDTO 采购产品入库前确认
 */
export class PurchaseOrderProductConfirmDTO extends OmitType(
  PurchaseOrderProductDetailsDTO,
  ['specId', 'unitPrice'] as const,
) {
  /**
   * @param actualQuantity 确认实际数量
   */
  @ApiProperty({ description: '实际可入库数量' })
  @Type(() => Number)
  @IsInt()
  actualQuantity: number;
}
