import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { LogModule } from '@/common/log/log.module';
import { OrderController } from './order.controller';
import { UtilsModule } from '@/common/utils/utils.module';
import { WarehousingModule } from '@/module/warehouse/warehousing/warehousing.module';

@Module({
  imports: [UtilsModule, LogModule, WarehousingModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
