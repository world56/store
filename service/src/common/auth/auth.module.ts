import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/module/user/user.module';

import { JWT_KEY } from '@/config/secret';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1s' },
    }),
    UserModule,
    PassportModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
