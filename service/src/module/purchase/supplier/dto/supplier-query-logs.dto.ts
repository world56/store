import { SupplierLogDTO } from './supplier-log.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

/**
 * @name SupplierQueryLogsDTO 查询供应商日志列表
 */
export class SupplierQueryLogsDTO extends PartialType(
  OmitType(SupplierLogDTO, ['content'] as const),
) {}
