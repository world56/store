import { Module } from '@nestjs/common';
import { SpecTemplateModule } from './template/spec-template.module';
import { SpecParameterModule } from './parameter/spec-parameter.module';

@Module({
  imports: [SpecTemplateModule, SpecParameterModule],
})
export class SpecModule {}
