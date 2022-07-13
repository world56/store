import { Module } from '@nestjs/common';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { SpecTemplateService } from './spec-template.service';
import { SpecTemplateController } from './spec-template.controller';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [SpecTemplateController],
  providers: [SpecTemplateService],
})
export class SpecTemplateModule {}
