import { Module } from '@nestjs/common';
import { ArrangementModule } from './arrangement/arrangement.module';

@Module({
  imports: [ArrangementModule]
})
export class WarehouseModule {}
