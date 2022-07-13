import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { DepartmentController } from './department.controller';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
