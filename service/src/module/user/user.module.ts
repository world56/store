import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { SecretService } from '@/common/secret/secret.service';
import { AdminUser, AdminUserSchema as UserModel } from '@/schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AdminUser.name,
        schema: UserModel,
      },
    ]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, SecretService],
})
export class UserModule {}
