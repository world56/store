import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { CommonDTO } from '@/dto/common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { ENUM_WAREHOUSE } from '@/enum/warehouse';

/**
 * @name WarehouseAuditDTO 审核出入库
 */
export class WarehouseAuditDTO extends PickType(CommonDTO, [
  'remark',
] as const) {
  // /**
  //  * @param warehousingId 出入库ID
  //  */
  // @ApiProperty({
  //   description: '仓储出库入订单号',
  // })
  // @Type(() => Number)
  // @IsInt()
  // warehousingId: number;

  /**
   * @param status 审核状态
   */
  @ApiProperty({ description: '审核状态 成功、失败' })
  @IsEnum([
    ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.REJECT,
    ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.RESOLVED,
  ])
  @Type(() => Number)
  @IsInt()
  status: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS;
}
