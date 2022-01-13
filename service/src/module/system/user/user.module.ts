import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { SecretModule } from '@/common/secret/secret.module';
import { SchemaAdminUser, AdminUser } from '@/schema/system/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: SchemaAdminUser },
    ]),
    SecretModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
