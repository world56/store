import {
  Min,
  IsInt,
  IsEnum,
  IsDate,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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

export class PrimaryKeyStringDTO {
  /**
   * @param id PRIMARY KEY Char
   */
  @ApiProperty({ description: 'PRIMARY KEY (string)' })
  @IsString({ message: '主键ID仅支持string' })
  id: string;
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
   * @param currentPage 当前页码
   */
  @ApiProperty({ description: '当前页码' })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  currentPage: number;

  /**
   * @param pageSize 每页条数
   */
  @ApiProperty({ description: '每页条数' })
  @Min(1)
  @Type(() => Number)
  @IsInt()
  pageSize: number;

  /**
   * @param time 时间范围
   */
  @ApiProperty({ description: '时间范围' })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ each: true })
  time?: number[];

  /**
   * @name updateTime 更新时间
   */
  @IsDate()
  @IsOptional()
  updateTime?: Date;

  /**
   * @param ids ID列表
   */
  @ApiProperty({ description: 'ID列表' })
  @Type(() => Number)
  @IsInt({ each: true })
  ids: number[];
}
