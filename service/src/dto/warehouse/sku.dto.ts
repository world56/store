import { IsInt } from 'class-validator';
import { CommonDTO } from '../common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * @name WarehouseSkuDTO 库房存储单位
 */
export class WarehouseSkuDTO extends PickType(CommonDTO, ['id']) {
  /**
   * @param sku 库存数量
   */
  @ApiProperty({ description: '库存数量' })
  @IsInt()
  sku: bigint;
}
