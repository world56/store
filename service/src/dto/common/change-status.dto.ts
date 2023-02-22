import { PickType } from '@nestjs/swagger';

import { CommonDTO } from './common.dto';

/**
 * @name ChangeStatusDTO 改变状态
 */
export class ChangeStatusDTO extends PickType(CommonDTO, [
  'id',
  'status',
  'remark'
] as const) {}
