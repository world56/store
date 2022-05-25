import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { UtilsModule } from '@/common/utils/utils.module';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
