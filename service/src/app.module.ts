import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UserTokenGuard } from './guard/user-token.guard';
import { SystemModule } from './module/system/system.module';
import { JwtAuthModule } from './common/jwtAuth/jwtAuth.module';

@Module({
  imports: [AuthModule, SystemModule, JwtAuthModule, ConfigModule.forRoot()],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: UserTokenGuard,
    },
  ],
})
export class AppModule {}
