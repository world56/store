import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_ADDRESS } from '@/config/database';

import { UserModule } from '@/module/user/user.module';
import { AuthModule } from '@/common/auth/auth.module';
import { SystemModule } from '@/module/system/system.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    UserModule,
    AuthModule,
    SystemModule,
  ],
})
export class AppModule {}
