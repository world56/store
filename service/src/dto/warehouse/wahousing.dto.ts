import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { CommonDTO } from '../common/common.dto';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { PurchaseOrderProductDetailsDTO } from '../purchase/order.dto';

/**
 * @name WarehousingDTO 采购、售后待入库
 */
export class WarehousingDTO extends PickType(CommonDTO, ['id']) {
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
   * @param inspectorId 检验入库人ID
   */
  @ApiProperty({
    description: '检验入库人ID',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  inspectorId: number;

  /**
   * @param creatorId 创建人
   */
  @ApiProperty({
    description: '创建人ID',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  creatorId: number;

  /**
   * @param type 待入库类型
   */
  @ApiProperty({
    description: '入库类型（采购、售后）',
    required: true,
  })
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSING_TYPE)
  @Type(() => Number)
  @IsInt()
  type: number;

  /**
   * @param status 入库流程状态
   */
  @ApiProperty({
    description: '完成、待入库',
    required: true,
  })
  @IsEnum(ENUM_WAREHOUSE.WAREHOUSING_PROCESS)
  @Type(() => Number)
  @IsInt()
  status: number;
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
