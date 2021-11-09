import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { SecretModule } from '@/common/secret/secret.module';
import { AdministratorUser, SchemaAdministratorUser } from '@/schema/system/user';

/**
 * @name UserModule 系统用户模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdministratorUser.name, schema: SchemaAdministratorUser },
    ]),
    AuthModule,
    SecretModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
