import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { LogModule } from '@/common/log/log.module';
import { AuditController } from './audit.controller';

@Module({
  exports: [AuditService],
  imports: [LogModule],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
