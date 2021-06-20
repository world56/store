import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_ADDRESS } from '@/config/database';
import { UserModule } from './module/user/user.module';
import { SecretService } from './common/secret/secret.service';
import { SecretModule } from './common/secret/secret.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    UserModule,
    SecretModule,
    AuthModule,
  ],
  providers: [SecretService],
})
export class AppModule {}
