import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaRole, Role } from '@/schema/system/role';
import { SchemaAdminUser, AdminUser } from '@/schema/system/user';

/**
 * @name RoleModule 角色模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: SchemaRole },
      { name: AdminUser.name, schema: SchemaAdminUser },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
