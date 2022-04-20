import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsDate, IsEnum, IsString, IsOptional } from 'class-validator';

import { ENUM_SYSTEM } from '@/enum/system';
import { CommonDTO } from './common.dto';

/**
 * @name AdminUserDTO 管理系统用户
 */

export class AdminUserDTO extends PickType(CommonDTO, [
  'id',
  'status',
  'remark',
] as const) {
  /**
   * @param account 登陆账号
   */
  @ApiProperty({
    required: true,
    description: '登陆账号',
    default: 'admin',
  })
  @IsString()
  readonly account: string;

  /**
   * @param password 用户密码
   */
  @ApiProperty({
    required: true,
    description: '用户密码',
  })
  @IsString()
  password: string;

  /**
   * @param name 用户名称
   */
  @ApiProperty({
    required: true,
    description: '用户名称',
  })
  @IsString()
  name: string;

  /**
   * @param phone 联系电话
   */
  @ApiProperty({
    required: true,
    description: '联系电话',
  })
  @IsString()
  phone: string;

  /**
   * @name email 电子邮箱
   */
  @ApiProperty({
    description: '电子邮箱地址',
  })
  @IsOptional()
  @IsString()
  email?: string;

  /**
   * @name roles 选择的角色
   */
  @ApiProperty({
    description: '选择的角色',
  })
  @IsOptional()
  @IsInt({ each: true })
  roles: number[];

  /**
   * @param isSuper 是否为超级管理员
   * @description 0:非超管 1：“超管
   */
  @ApiProperty({
    description: '是否为超级管理员',
    enum: ENUM_SYSTEM.SUPER_ADMIN,
  })
  @IsInt()
  @IsOptional()
  @IsEnum(ENUM_SYSTEM.SUPER_ADMIN)
  isSuper?: number;

  /**
   * @param createTime 创建时间
   */
  @IsDate()
  @IsOptional()
  createTime?: Date;
}
