import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { JWT_KEY } from '@/config/secret';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
