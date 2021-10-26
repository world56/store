import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';

/**
 * @name name 系统管理
 */
@Module({
  imports: [RoleModule],
})
export class SystemModule {}
