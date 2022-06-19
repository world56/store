import { IsString } from 'class-validator';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';

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
