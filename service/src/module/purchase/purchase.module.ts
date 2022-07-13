import { Module } from '@nestjs/common';
import { SpecModule } from './spec/spec.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [SupplierModule, ProductModule, SpecModule, OrderModule],
})
export class PurchaseModule {}
