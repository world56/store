import { CommonDTO } from './common.dto';
import { PickType } from '@nestjs/swagger';

/**
 * @name CheckFieldsIsRepeatDTO 检测字段是否重复
 */
export class CheckFieldsIsRepeatDTO extends PickType(CommonDTO, [
  'id',
  'name',
] as const) {}
