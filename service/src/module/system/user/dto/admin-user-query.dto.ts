import {
  OmitType,
  PickType,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { CommonDTO } from '@/dto/common.dto';
import { AdminUserDTO } from '@/dto/admin-user.dto';

/**
 * @name AdminUserQuery 获取后台系统用户列表
 */
export class AdminUserQuery extends IntersectionType(
  PickType(CommonDTO, ['currentPage', 'pageSize'] as const),
  PartialType(OmitType(AdminUserDTO, ['id', 'remark', 'password'] as const)),
) {
  take: number;
  skip: number;
}
