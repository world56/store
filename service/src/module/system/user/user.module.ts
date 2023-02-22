import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LogModule } from '@/common/log/log.module';
import { UtilsModule } from '@/common/utils/utils.module';
import { EncryptionModule } from '@/common/encryption/encryption.module';

@Module({
  imports: [UtilsModule, EncryptionModule, LogModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
