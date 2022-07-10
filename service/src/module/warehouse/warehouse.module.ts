import { Module } from '@nestjs/common';
import { PositionModule } from './position/position.module';
import { WarehousingModule } from './warehousing/warehousing.module';

@Module({
  imports: [PositionModule, WarehousingModule],
})
export class WarehouseModule {}
