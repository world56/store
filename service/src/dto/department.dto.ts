import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CommonDTO } from './common.dto';

/**
 * @name Department
 */
export class DepartmentDTO extends PickType(CommonDTO, [
  'id',
  'status',
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
}
