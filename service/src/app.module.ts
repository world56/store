import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/module/auth/auth.module';
import { SystemModule } from '@/module/system/system.module';

import { MONGOOSE_ADDRESS } from '@/config/db';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    AuthModule,
    SystemModule,
  ],
})
export class AppModule {}
