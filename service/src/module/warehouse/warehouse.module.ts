import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [PositionModule, ProductModule],
})
export class WarehouseModule {}
