import { Module } from '@nestjs/common';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { SpecCategoryService } from './spec-category.service';
import { SpecCategoryController } from './spec-category.controller';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [SpecCategoryController],
  providers: [SpecCategoryService],
})
export class SpecCategoryModule {}
