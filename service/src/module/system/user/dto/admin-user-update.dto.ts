import {
  OmitType,
  PickType,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { AdminUserDTO } from '@/dto/admin-user.dto';

/**
 * @name AdminUserUpdateDTO 编辑系统用户
 */
export class AdminUserUpdateDTO extends IntersectionType(
  OmitType(AdminUserDTO, ['password'] as const),
  PartialType(PickType(AdminUserDTO, ['password'] as const)),
) {}
