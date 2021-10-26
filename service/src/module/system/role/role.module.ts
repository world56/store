import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaRole, Role } from '@/schema/system/role';

/**
 * @name RoleModule 角色模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: SchemaRole },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
