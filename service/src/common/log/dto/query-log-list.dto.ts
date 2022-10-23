import { LogDTO } from '@/dto/common/Log.dto';
import { InsertLogDTO } from './insert-log.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name QueryLogListDTO 查询日志记录
 */
export class QueryLogListDTO extends IntersectionType(
  PickType(LogDTO, ['relationId'] as const),
  PartialType(PickType(InsertLogDTO, ['module'])),
) {}
