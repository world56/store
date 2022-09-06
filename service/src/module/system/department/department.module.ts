import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { UtilsModule } from '@/common/utils/utils.module';
import { DepartmentController } from './department.controller';

@Module({
  imports: [UtilsModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
