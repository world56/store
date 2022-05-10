import { CommonDTO } from './common.dto';
import { Type } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ENUM_WAREHOUSE } from '@/enum/warehouse';

/**
 * @name WarehouseArrangement 货仓（仓位）
 */
export class WarehouseArrangementDTO extends PickType(CommonDTO, [
  'id',
  'remark',
] as const) {
  /**
   * @param name 货仓名称
   */
  @IsOptional()
  @IsString()
  name: string;

  /**
   * @param status 状态
   */
  @ApiProperty({
    description: '状态',
  })
  @Type(() => Number)
  @IsOptional()
  @IsEnum(ENUM_WAREHOUSE.STATUS)
  @IsInt()
  status?: number;

  /**
   * @param personId 负责人ID
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  personId: number;
}
