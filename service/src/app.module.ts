import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './common/file/file.module';
import { AuthModule } from './module/auth/auth.module';
import { UserTokenGuard } from './guard/user-token.guard';
import { PrismaModule } from './common/prisma/prisma.module';
import { SystemModule } from './module/system/system.module';
import { FinanceModule } from './module/finance/finance.module';
import { JwtAuthModule } from './common/jwtAuth/jwtAuth.module';
import { CategoryModule } from './common/category/category.module';
import { PurchaseModule } from './module/purchase/purchase.module';
import { WarehouseModule } from './module/warehouse/warehouse.module';
import { PaymentModule } from './module/finance/payment/payment.module';

@Module({
  imports: [
    PrismaModule,
    MongooseModule.forRoot(process.env.DATABASE_MONGODB_URL),
    FileModule,
    AuthModule,
    SystemModule,
    JwtAuthModule,
    WarehouseModule,
    CategoryModule,
    PurchaseModule,
    PaymentModule,
    FinanceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserTokenGuard,
    },
  ],
})
export class AppModule {}
