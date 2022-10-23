import { Module } from '@nestjs/common';
import { LogModule } from '@/common/log/log.module';
import { WarehousingService } from './warehousing.service';
import { WarehousingController } from './warehousing.controller';

@Module({
  imports: [LogModule],
  controllers: [WarehousingController],
  providers: [WarehousingService],
})
export class WarehousingModule {}
