import { CommonDTO } from '@/dto/common.dto';
import { DepartmentDTO } from '@/dto/department.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name DepartmentQueryListDTO 查询部门列表
 */
export class DepartmentQueryListDTO extends IntersectionType(
  PartialType(DepartmentDTO),
  PickType(CommonDTO, ['pageSize', 'pageSize'] as const),
) {}
