import { Module } from '@nestjs/common';
import { SpecModule } from './spec/spec.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { ParameterModule } from './parameter/parameter.module';

@Module({
  imports: [SupplierModule, ProductModule, SpecModule, ParameterModule]
})
export class PurchaseModule {}
