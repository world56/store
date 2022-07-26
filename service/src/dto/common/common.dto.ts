import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsEnum, IsString, IsOptional } from 'class-validator';

import { ENUM_COMMON } from '@/enum/common';

/**
 * @name PrimaryKeyDTO 主键 Int
 */
export class PrimaryKeyDTO {
  /**
   * @param id PRIMARY KEY Int
   */
  @ApiProperty({
    description: 'PRIMARY KEY (number)',
  })
  @Type(() => Number)
  @IsInt({ message: '主键ID仅支持INT' })
  id: number;
}

/**
 * @name CommonDTO 公共
 */
export class CommonDTO extends PartialType(PrimaryKeyDTO) {
  /**
   * @param status 状态
   * @description 0:冻结 1:启用
   */
  @ApiProperty({ description: '状态' })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ENUM_COMMON.STATUS)
  @IsInt()
  status?: number;

  /**
   * @param parentId 所属模块
   */
  @ApiProperty({ description: '所属模块' })
  @IsOptional()
  @IsInt()
  parentId?: number;

  /**
   * @param name 名称
   */
  @ApiProperty({ description: '名称' })
  @IsString()
  name: string;

  /**
   * @param remark 备注
   */
  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;

  /**
   * @param userId 用户ID
   */
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  userId?: number;

  /**
   * @param ids ID列表
   */
  @ApiProperty({ description: 'ID列表' })
  @Type(() => Number)
  @IsInt({ each: true })
  ids: number[];
}
