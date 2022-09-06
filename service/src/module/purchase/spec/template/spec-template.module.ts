import { Module } from '@nestjs/common';
import { UtilsModule } from '@/common/utils/utils.module';
import { SpecTemplateService } from './spec-template.service';
import { SpecTemplateController } from './spec-template.controller';

@Module({
  imports: [UtilsModule],
  controllers: [SpecTemplateController],
  providers: [SpecTemplateService],
})
export class SpecTemplateModule {}
