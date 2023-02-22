import { LogDTO } from '@/dto/common/Log.dto';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * @name QueryLogListDTO 查询日志记录
 */
export class QueryLogListDTO extends PartialType(
  PickType(LogDTO, ['creatorId', 'relationId', 'type', 'module'] as const),
) {}
