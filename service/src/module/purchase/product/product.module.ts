import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { LogModule } from '@/common/log/log.module';
import { ProductController } from './product.controller';
import { UtilsModule } from '@/common/utils/utils.module';

@Module({
  imports: [UtilsModule, LogModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
