import { PickType } from '@nestjs/swagger';
import { FinancePaymentDTO } from '@/dto/finance/payment';

/**
 * @name PaymentConfirmDTO 确认应付款信息
 */
export class PaymentConfirmDTO extends PickType(FinancePaymentDTO, [
  'id',
  'remark',
  'totalAmount',
  'actualPayment',
  'vouchers',
] as const) {}
