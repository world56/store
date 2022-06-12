import { Module } from '@nestjs/common';
import { SpecCategoryModule } from './category/spec-category.module';
import { SpecParameterModule } from './parameter/spec-parameter.module';

@Module({
  imports: [SpecCategoryModule, SpecParameterModule],
})
export class SpecModule {}
