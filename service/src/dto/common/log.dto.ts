import {
  PickType,
  ApiProperty,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { CommonDTO, PrimaryKeyDTO } from './common.dto';

/**
 * @name LogDTO 日志
 */
export class LogDTO extends IntersectionType(
  PartialType(PrimaryKeyDTO),
  PickType(CommonDTO, ['remark']),
) {
  /**
   * @param type 日志类型
   */
  @ApiProperty({ description: '日志类型' })
  @IsString()
  type: number;

  /**
   * @param relationId 关联业务ID
   */
  @ApiProperty({ description: '关联业务ID' })
  @IsInt()
  relationId: number;

  /**
   * @param createTime 创建时间
   */
  @ApiProperty({ description: '关联人业务ID' })
  @IsOptional()
  @IsDate()
  createTime?: Date;
}
