import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { LogModule } from '@/common/log/log.module';
import { AuditController } from './audit.controller';
import { WarehousingModule } from '../warehousing/warehousing.module';

@Module({
  exports: [AuditService],
  imports: [LogModule, WarehousingModule],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
