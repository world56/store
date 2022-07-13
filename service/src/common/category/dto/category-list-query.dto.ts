import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @name CategoryListQueryDTO 查询类目列表
 */
export class CategoryListQueryDTO {
  @ApiProperty({
    description: '查询类目类型列表',
  })
  @IsString({
    each: true,
    message: '类型不得为空',
  })
  type: string[];
}
