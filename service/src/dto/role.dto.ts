import { CommonDTO } from './common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * @name RoleDTO 角色DTO
 */
export class RoleDto extends PickType(CommonDTO, ['id', 'status'] as const) {
  /**
   * @param name 角色名称
   */
  @ApiProperty({
    description: '角色名称',
  })
  @MaxLength(10)
  @IsString()
  name: string;

  @ApiProperty({
    description: '权限点',
  })
  @IsInt({ each: true })
  permissionId: number[];

  /**
   * @param remark 角色备注
   */
  @ApiProperty({
    description: '角色备注信息',
  })
  @IsOptional()
  @IsString()
  remark?: string;
}
