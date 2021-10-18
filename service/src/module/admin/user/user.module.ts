import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { SecretModule } from '@/common/secret/secret.module';
import { AdminUser, AdminUserSchema } from '@/schema/admin/system/user';

/**
 * @name UserModule 用户模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: AdminUserSchema },
    ]),
    AuthModule,
    SecretModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
