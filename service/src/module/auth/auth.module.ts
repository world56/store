import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from './auth.controller';
import { LogModule } from '@/common/log/log.module';
import { UserModule } from '../system/user/user.module';
import { JwtAuthModule } from '@/common/jwtAuth/jwtAuth.module';
import { EncryptionModule } from '@/common/encryption/encryption.module';

@Module({
  imports: [EncryptionModule, JwtAuthModule, UserModule, LogModule],
  controllers: [UserController],
  providers: [AuthService],
})
export class AuthModule {}
