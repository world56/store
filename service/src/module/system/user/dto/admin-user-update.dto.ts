import {
  OmitType,
  PickType,
  PartialType,
  IntersectionType,
  ApiProperty,
} from '@nestjs/swagger';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { IsOptional, IsString } from 'class-validator';

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
