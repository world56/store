import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, IsOptional, Min } from 'class-validator';

import { ENUM_COMMON } from '@/enum/common';
import { Type } from 'class-transformer';

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
  @IsInt()
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
  @ApiProperty({
    description: '状态',
  })
  @Type(() => Number)
  @IsOptional()
  @IsEnum(ENUM_COMMON.STATUS)
  @IsInt()
  status?: number;

  /**
   * @param remark 备注
   */
  @ApiProperty({
    description: '备注',
  })
  @IsOptional()
  @IsString()
  remark?: string;

  /**
   * @param currentPage 当前页码
   */
  @ApiProperty({
    description: '当前页码',
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  currentPage: number;

  /**
   * @param pageSize 每页条数
   */
  @ApiProperty({
    description: '每页条数',
  })
  @Min(1)
  @Type(() => Number)
  @IsInt()
  pageSize: number;
}
