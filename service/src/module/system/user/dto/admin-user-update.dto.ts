import {
  OmitType,
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name AdminUserUpdateDTO 编辑系统用户
 */
export class AdminUserUpdateDTO extends IntersectionType(
  OmitType(AdminUserDTO, ['password'] as const),
  PartialType(PickType(AdminUserDTO, ['password'] as const)),
) {
  /**
   * @param avatar 用户头像
   */
  @ApiProperty({
    description: '用户头像',
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
