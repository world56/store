import { PartialType, PickType } from '@nestjs/swagger';
import { PermissionDTO } from '@/dto/system/permission.dto';

/**
 * @name PermissionQueryListDto 查询权限列表
 */
export class PermissionQueryListDto extends PartialType(
  PickType(PermissionDTO, ['code', 'name', 'status'] as const),
) {}
