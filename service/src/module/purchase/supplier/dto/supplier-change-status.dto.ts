import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { CommonDTO, PrimaryKeyDTO } from '@/dto/common/common.dto';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';

/**
 * @name SupplierChangeStatusDTO 供应商状态
 */
export class SupplierChangeStatusDTO extends IntersectionType(
  PrimaryKeyDTO,
  PickType(CommonDTO, ['status'] as const),
) {
  /**
   * @param reason 冻结原因
   */
  @ApiProperty({ description: '冻结原因' })
  @Type(() => String)
  @IsString()
  content: string;
}
