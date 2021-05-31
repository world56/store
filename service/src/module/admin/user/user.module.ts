import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { SecretService } from '@/common/service/secret.service';
import { AdminUser, AdminUserSchema } from '@/schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: AdminUserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, SecretService],
})
export class UserModule {}
