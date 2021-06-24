import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { SecretModule } from '@/common/secret/secret.module';
import { AdminUser, AdminUserSchema as UserModel } from '@/schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AdminUser.name,
        schema: UserModel,
      },
    ]),
    AuthModule,
    SecretModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
