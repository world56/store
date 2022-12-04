import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [PaymentModule, AccountModule],
})
export class FinanceModule {}
