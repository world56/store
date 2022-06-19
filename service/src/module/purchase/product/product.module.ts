import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UtilsModule } from '@/common/utils/utils.module';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
