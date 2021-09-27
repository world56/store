import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from '@/common/auth/auth.module';

/**
 * @name AdminModule 管理系统
 */
@Module({
  imports: [AuthModule, UserModule, SystemModule],
})
export class AdminModule {}
