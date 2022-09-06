import { Module } from '@nestjs/common';
import { WarehousingService } from './warehousing.service';
import { WarehousingController } from './warehousing.controller';

@Module({
  controllers: [WarehousingController],
  providers: [WarehousingService],
})
export class WarehousingModule {}
