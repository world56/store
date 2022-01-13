import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';

/**
 * @name name 系统管理
 */
@Module({
  imports: [UserModule, RoleModule, PermissionModule],
})
export class SystemModule {}
