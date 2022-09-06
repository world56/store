import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { LogModule } from '@/common/log/log.module';
import { OrderController } from './order.controller';
import { UtilsModule } from '@/common/utils/utils.module';

@Module({
  imports: [UtilsModule, LogModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
