import { Module } from '@nestjs/common';
import { PositionModule } from './position/position.module';
import { WarehousingModule } from './warehousing/warehousing.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [PositionModule, WarehousingModule, AuditModule],
})
export class WarehouseModule {}
