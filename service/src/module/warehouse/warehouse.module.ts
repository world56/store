import { Module } from '@nestjs/common';
import { PositionModule } from './position/position.module';

@Module({
  imports: [PositionModule]
})
export class WarehouseModule {}
