import { CommonDTO } from './common.dto';
import { Type } from 'class-transformer';
import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';

/**
 * @name LogDTO 日志
 */
export class LogDTO extends PickType(CommonDTO, ['remark']) {
  /**
   * @param type 日志类型、状态
   */
  @ApiProperty({ description: '日志类型、状态' })
  @IsInt()
  @IsOptional()
  type: number;

  /**
   * @param relationId 关联业务ID
   */
  @ApiProperty({ description: '关联业务ID' })
  @Type(() => Number)
  @IsNumber()
  relationId: number;

  /**
   * @param createTime 创建时间
   */
  @ApiProperty({ description: '创建时间' })
  @IsOptional()
  @IsDate()
  createTime?: Date;
}
