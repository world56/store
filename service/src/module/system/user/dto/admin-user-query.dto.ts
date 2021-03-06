import {
  OmitType,
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { CommonDTO } from '@/dto/common/common.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';

/**
 * @name AdminUserQuery 获取后台系统用户列表
 */
export class AdminUserQuery extends IntersectionType(
  PartialType(OmitType(AdminUserDTO, ['id', 'remark', 'password'] as const)),
  IntersectionType(
    PickType(CommonDTO, ['currentPage', 'pageSize'] as const),
    PartialType(PickType(CommonDTO, ['time'] as const)),
  ),
) {
  /**
   * @param departmentId 所属部门ID
   */
  @ApiProperty({
    description: '部门id',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departmentId: number;

  take: number;
  skip: number;
}
