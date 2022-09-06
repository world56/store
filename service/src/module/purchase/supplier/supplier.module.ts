import { Module } from '@nestjs/common';
import { LogModule } from '@/common/log/log.module';
import { SupplierService } from './supplier.service';
import { UtilsModule } from '@/common/utils/utils.module';
import { SupplierController } from './supplier.controller';

@Module({
  imports: [UtilsModule, LogModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
