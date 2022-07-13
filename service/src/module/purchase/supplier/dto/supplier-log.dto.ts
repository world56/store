import { Type } from 'class-transformer';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { ENUM_PURCHASE } from '@/enum/purchase';

export class SupplierLogDTO extends PrimaryKeyDTO {
  /**
   * @name type 日志类型
   */
  @IsEnum(ENUM_PURCHASE.LOG_TYPE)
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  type: ENUM_PURCHASE.LOG_TYPE;

  /**
   * @param content 内容（原因）
   */
  @IsString()
  content: string;
}
