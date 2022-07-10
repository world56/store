import { Module } from '@nestjs/common';
import { WarehousingService } from './warehousing.service';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { WarehousingController } from './warehousing.controller';

@Module({
  imports: [PrismaModule],
  controllers: [WarehousingController],
  providers: [WarehousingService],
})
export class WarehousingModule {}
