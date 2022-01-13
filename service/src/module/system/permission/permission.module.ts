import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { SchemaPermission, Permission } from '@/schema/system/permission';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: SchemaPermission },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
