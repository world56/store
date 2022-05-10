import { PermissionDTO } from '@/dto/permission.dto';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PermissionQueryListDto 查询权限列表
 */
export class PermissionQueryListDto extends PartialType(
  PickType(PermissionDTO, ['code', 'name', 'status'] as const),
) {}
