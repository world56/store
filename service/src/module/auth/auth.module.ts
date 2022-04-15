import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from './auth.controller';
import { UserModule } from '../system/user/user.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtAuthModule } from '@/common/jwtAuth/jwtAuth.module';
import { EncryptionModule } from '@/common/encryption/encryption.module';

@Module({
  imports: [EncryptionModule, JwtAuthModule, UserModule],
  controllers: [UserController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
