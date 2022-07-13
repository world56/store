import { Module } from '@nestjs/common';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { SpecParameterService } from './spec-parameter.service';
import { SpecParameterController } from './spec-parameter.controller';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [SpecParameterController],
  providers: [SpecParameterService],
})
export class SpecParameterModule {}
