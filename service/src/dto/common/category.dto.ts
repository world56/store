import { CommonDTO } from './common.dto';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { ENUM_COMMON } from '@/enum/common';

/**
 * @name CategoryDTO 类目、类型管理
 */
export class CategoryDTO extends PickType(CommonDTO, ['id', 'name', 'remark']) {
  /**
   * @param type 类目类型
   */
  @ApiProperty({ description: '类目类型： 0:仓库产品类型' })
  @IsEnum(ENUM_COMMON.CATEGORY_TYPE)
  @IsString()
  type: ENUM_COMMON.CATEGORY_TYPE;
}
