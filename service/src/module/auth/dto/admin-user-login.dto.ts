import { PickType } from '@nestjs/swagger';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name AdminUserLoginDTO 用户登陆
 */
export class AdminUserLoginDTO extends PickType(AdminUserDTO, [
  'account',
  'password',
] as const) {}
