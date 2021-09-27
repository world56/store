import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRoleSchema, AdminRole } from '@/schema/role';

/**
 * @name RoleModule 角色模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminRole.name, schema: AdminRoleSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
