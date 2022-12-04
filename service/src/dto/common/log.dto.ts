import { CommonDTO } from './common.dto';
import { Type } from 'class-transformer';
import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

import { ENUM_COMMON } from '@/enum/common';

/**
 * @name LogDTO 日志
 */
export class LogDTO extends PickType(CommonDTO, ['remark']) {
  /**
   * @param module 日志模块
   * @descprtion 每个模块日志都会有单独的集合
   */
  @ApiProperty({ description: '日志模块' })
  @Type(() => Number)
  @IsEnum(ENUM_COMMON.LOG_MODULE)
  @IsInt()
  module: ENUM_COMMON.LOG_MODULE;

  /**
   * @param type 日志类型、状态
   */
  @ApiProperty({ description: '日志类型' })
  @Type(() => Number)
  @IsInt()
  type: number;

  /**
   * @param relationId 关联业务ID
   */
  @ApiProperty({ description: '关联业务ID' })
  @Type(() => Number)
  @IsNumber()
  relationId: number;

  /**
   * @param creatorId 日志创建人ID
   */
  @ApiProperty({ description: '日志创建人ID' })
  @Type(() => Number)
  @IsNumber()
  creatorId: number;

  /**
   * @param createTime 创建时间
   */
  @ApiProperty({ description: '创建时间' })
  @IsOptional()
  @IsDate()
  createTime?: Date;
}
