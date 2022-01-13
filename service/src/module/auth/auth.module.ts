import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from '@/common/jwtAuth/auth.module';
import { SecretModule } from '@/common/secret/secret.module';
import {
  SchemaAdminUser,
  AdminUser as AdminUserModel,
} from '@/schema/system/user';

/**
 * @name AuthModule 系统鉴权
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUserModel.name, schema: SchemaAdminUser },
    ]),
    SecretModule,
    JwtAuthModule,
  ],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
