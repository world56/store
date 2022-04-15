import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PickType } from '@nestjs/swagger';

/**
 * @name AdminUserLoginDTO 用户登陆
 */
export class AdminUserLoginDTO extends PickType(AdminUserDTO, [
  'account',
  'password',
] as const) {}
