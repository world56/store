import { AdminUserDTO } from '@/dto/admin-user.dto';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * @name UserCheckFilesDto 字段查重
 */
export class UserCheckFilesDto extends PartialType(
  PickType(AdminUserDTO, ['id', 'account', 'name', 'phone', 'email'] as const),
) {}