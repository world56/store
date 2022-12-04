import { QueryDTO } from '@/dto/common/query.dto';
import { FinancePaymentDTO } from '@/dto/finance/payment';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

/**
 * @name PaymentQueryListDTO 查询应付款列表DTO
 */
export class PaymentQueryListDTO extends IntersectionType(
  PickType(QueryDTO, ['pageSize', 'currentPage', 'createTime'] as const),
  PartialType(PickType(FinancePaymentDTO, ['no', 'type', 'status'] as const)),
) {
  take: number;
  skip: number;
}
