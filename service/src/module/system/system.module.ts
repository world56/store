import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [PermissionModule, RoleModule, UserModule, DepartmentModule],
})
export class SystemModule {}
