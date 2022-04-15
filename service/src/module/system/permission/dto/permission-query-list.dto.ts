import { CommonDTO } from '@/dto/common.dto';
import { PermissionDTO } from '@/dto/permission.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PermissionQueryListDto 查询权限列表
 */
export class PermissionQueryListDto extends IntersectionType(
  PartialType(PickType(PermissionDTO, ['code', 'name', 'status'] as const)),
  PickType(CommonDTO, ['currentPage', 'pageSize'] as const),
) {
  take: number;
  skip: number;
}
