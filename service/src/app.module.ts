import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModule } from '@/module/system/system.module';

import { MONGOOSE_ADDRESS } from '@/config/db';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    SystemModule,
  ],
})
export class AppModule {}
