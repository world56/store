import { PermissionDTO } from '@/dto/permission.dto';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PermissionCheckRepeat 查询是否存在重复
 */
export class PermissionCheckRepeat extends PartialType(
  PickType(PermissionDTO, ['id', 'name', 'code'] as const),
) {}
