import { PickType } from '@nestjs/swagger';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name AdminUserStatusChangeDto 系统用户冻结状态
 */
export class AdminUserStatusChangeDto extends PickType(AdminUserDTO, [
  'id',
  'status',
] as const) {}
