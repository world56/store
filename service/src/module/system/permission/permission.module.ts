import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { PermissionController } from './permission.controller';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
