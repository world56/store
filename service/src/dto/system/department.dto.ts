import { CommonDTO } from '../common/common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

/**
 * @name DepartmentDTO 部门DTO
 */
export class DepartmentDTO extends PickType(CommonDTO, [
  'id',
  'parentId',
  'remark',
] as const) {
  /**
   * @param name 部门名称
   */
  @ApiProperty({
    description: '部门名称',
  })
  @MaxLength(15)
  @IsString()
  name: string;

  @ApiProperty({
    description: '部门用户',
  })
  @IsOptional()
  @IsInt({ each: true })
  users: number[];
}
