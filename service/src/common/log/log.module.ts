import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogSchema } from '@/schema/log.shcema';
import { MongooseModule } from '@nestjs/mongoose';
import { LogController } from './log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'pruchaseLog', schema: LogSchema },
      { name: 'supplierLog', schema: LogSchema },
    ]),
  ],
  providers: [LogService],
  exports: [LogService],
  controllers: [LogController],
})
export class LogModule {}
