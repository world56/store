import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { UtilsModule } from '@/common/utils/utils.module';
import { ArrangementController } from './arrangement.controller';
import { ArrangementService } from './arrangement.service';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [ArrangementController],
  providers: [ArrangementService],
})
export class ArrangementModule {}
