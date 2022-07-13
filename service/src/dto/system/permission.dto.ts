import {
  IsInt,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ENUM_SYSTEM } from '@/enum/system';
import { CommonDTO } from '../common/common.dto';
import { PickType, ApiProperty } from '@nestjs/swagger';

/**
 * @name PermissionDTO 权限DTO
 */
export class PermissionDTO extends PickType(CommonDTO, [
  'id',
  'status',
  'parentId',
  'remark',
] as const) {
  /**
   * @param name 权限名
   */
  @ApiProperty({
    description: '权限名称',
  })
  @MaxLength(32)
  @IsString()
  name: string;

  /**
   * @param code 权限英文名
   */
  @ApiProperty({
    description: '权限英文名称',
  })
  @MaxLength(32)
  @IsString()
  code: string;

  /**
   * @param type 权限类型
   */
  @Type(() => Number)
  @IsInt()
  @IsEnum(ENUM_SYSTEM.PERMISSION_TYPE)
  type: number;
}
