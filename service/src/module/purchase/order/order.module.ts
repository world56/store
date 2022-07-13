import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
