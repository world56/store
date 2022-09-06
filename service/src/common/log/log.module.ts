import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { Log, LogSchema } from './schema/Log';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
