import { IsString } from 'class-validator';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';

/**
 * @name AdminUserUpdatePwdDTO 修改用户密码
 */
export class AdminUserUpdatePwdDTO extends IntersectionType(
  PrimaryKeyDTO,
  PickType(AdminUserDTO, ['password'] as const),
) {
  /**
   * @param newPassword 用户新密码
   */
  @ApiProperty({
    required: true,
    description: '新密码',
  })
  @IsString()
  newPassword: string;
}
