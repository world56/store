import { PartialType, PickType } from '@nestjs/swagger';
import { PermissionDTO } from '@/dto/system/permission.dto';
/**
 * @name PermissionCheckRepeat 查询是否存在重复
 */
export class PermissionCheckRepeat extends PartialType(
  PickType(PermissionDTO, ['id', 'name', 'code'] as const),
) {}
