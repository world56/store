import { Type } from 'class-transformer';
import { LogDTO } from '@/dto/common/Log.dto';
import { IsEnum, IsInt } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { ENUM_COMMON } from '@/enum/common';

export class InsertLogDTO extends PickType(LogDTO, [
  'type',
  'remark',
  'relationId',
] as const) {
  /**
   * @name module 日志所属模块
   */
  @ApiProperty({ description: '日志所属模块' })
  @IsEnum(ENUM_COMMON.LOG_MODULE)
  @Type(() => Number)
  @IsInt()
  module: ENUM_COMMON.LOG_MODULE;
}
