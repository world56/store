import {
  IsInt,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { CommonDTO } from '../common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

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
  @MaxLength(20)
  @IsString()
  name: string;

  @ApiProperty({
    description: '权限点',
  })
  @IsOptional()
  @IsInt({ each: true })
  permissionId?: number[];

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
