import {
  OmitType,
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { QueryDTO } from '@/dto/common/query.dto';
import { IsInt, IsOptional } from 'class-validator';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name AdminUserQuery 获取后台系统用户列表
 */
export class AdminUserQuery extends IntersectionType(
  PickType(QueryDTO, ['currentPage', 'pageSize', 'createTime'] as const),
  PartialType(OmitType(AdminUserDTO, ['id', 'remark', 'password'] as const)),
) {
  /**
   * @param departmentId 所属部门ID
   */
  @ApiProperty({ description: '部门id' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departmentId: number;

  take: number;
  skip: number;
}
