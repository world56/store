import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { QueryDTO } from '@/dto/common/query.dto';
import { FinanceAccountDTO } from '@/dto/finance/account';

/**
 * @name FinanceAccountQueryListDTO 查询供应商付款账户列表
 */
export class FinanceAccountQueryListDTO extends IntersectionType(
  PartialType(
    PickType(FinanceAccountDTO, [
      'accountName',
      'accountNumber',
      'organizationId',
      'supplierId',
    ] as const),
  ),
  PickType(QueryDTO, ['pageSize', 'currentPage'] as const),
) {
  take: number;
  skip: number;
}
