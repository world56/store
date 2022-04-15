import { RoleDto } from '@/dto/role.dto';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * @name RuleCheckFieldsDTO 角色字段查询重
 */
export class RuleCheckFieldsDTO extends PartialType(
  PickType(RoleDto, ['id', 'name'] as const),
) {}
