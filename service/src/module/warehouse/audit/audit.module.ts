import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { LogModule } from '@/common/log/log.module';
import { AuditController } from './audit.controller';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, LogModule],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
