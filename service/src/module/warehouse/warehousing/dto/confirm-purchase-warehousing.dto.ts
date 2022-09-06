import {
  WarehousingDTO,
  PurchaseOrderProductConfirmDTO,
} from '@/dto/warehouse/wahousing.dto';
import { Type } from 'class-transformer';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { CommonDTO } from '@/dto/common/common.dto';

/**
 * @name ConfirmPurchaseWarehousingDTO 确认采购入库信息
 */
export class ConfirmPurchaseWarehousingDTO extends IntersectionType(
  PickType(WarehousingDTO, ['id'] as const),
  PickType(CommonDTO, ['remark'] as const),
) {
  /**
   * @param products 产品信息
   */
  @ApiProperty({ description: '产品信息' })
  @ValidateNested()
  @Type(() => PurchaseOrderProductConfirmDTO)
  @IsArray()
  products: PurchaseOrderProductConfirmDTO[];
}
