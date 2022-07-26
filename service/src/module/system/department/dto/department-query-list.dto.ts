import { QueryDTO } from '@/dto/common/query.dto';
import { DepartmentDTO } from '@/dto/system/department.dto';
import { PickType, PartialType, IntersectionType } from '@nestjs/swagger';

/**
 * @name DepartmentQueryListDTO 查询部门列表
 */
export class DepartmentQueryListDTO extends IntersectionType(
  PartialType(DepartmentDTO),
  PickType(QueryDTO, ['pageSize', 'pageSize', 'userId'] as const),
) {
  take: number;
  skip: number;
}
