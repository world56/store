import { PartialType, PickType } from '@nestjs/swagger';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name UserCheckFilesDto 字段查重
 */
export class UserCheckFilesDto extends PartialType(
  PickType(AdminUserDTO, ['id', 'account', 'name', 'phone', 'email'] as const),
) {}