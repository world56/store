import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { UtilsModule } from '@/common/utils/utils.module';
import { PositionController } from './position.controller';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
