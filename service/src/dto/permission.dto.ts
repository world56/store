import {
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { CommonDTO } from './common.dto';
import { Type } from 'class-transformer';
import { ENUM_SYSTEM } from '@/enum/system';
import { PickType, ApiProperty } from '@nestjs/swagger';

/**
 * @name PermissionDTO 权限DTO
 */
export class PermissionDTO extends PickType(CommonDTO, [
  'id',
  'status',
] as const) {
  /**
   * @param name 权限名
   */
  @ApiProperty({
    description: '权限名称',
  })
  @MaxLength(20)
  @IsString()
  name: string;

  /**
   * @param code 权限英文名
   */
  @ApiProperty({
    description: '权限英文名称',
  })
  @MaxLength(20)
  @IsString()
  code: string;

  /**
   * @param parentId 所属模块
   */
  @ApiProperty({
    description: '所属模块',
  })
  @IsOptional()
  @IsInt()
  parentId?: number;

  /**
   * @param type 权限类型
   */
  @Type(() => Number)
  @IsInt()
  @IsEnum(ENUM_SYSTEM.PERMISSION_TYPE)
  type: number;

  /**
   * @param 备注
   */
  @IsString()
  @IsOptional()
  remark?: string;
}
