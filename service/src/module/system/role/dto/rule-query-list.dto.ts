import {
  PickType,
  ApiProperty,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleDto } from '@/dto/system/role.dto';
import { QueryDTO } from '@/dto/common/query.dto';
import { IsInt, IsOptional } from 'class-validator';

/**
 * @name RuleQueryListDTO 查询角色列表
 */
export class RuleQueryListDTO extends IntersectionType(
  PartialType(PickType(RoleDto, ['name', 'status'] as const)),
  PickType(QueryDTO, ['currentPage', 'pageSize'] as const),
) {
  @ApiProperty({
    description: '有关联关系的权限id',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  permissionId?: number;

  take: number;
  skip: number;
}
