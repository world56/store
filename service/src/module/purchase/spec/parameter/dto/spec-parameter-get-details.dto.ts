import { PickType } from '@nestjs/swagger';
import { CommonDTO } from '@/dto/common.dto';

/**
 * @name SpecParameterGetDetailsDTO 查询规格列表
 */
export class SpecParameterGetDetailsDTO extends PickType(CommonDTO, [
  'ids',
] as const) {}
