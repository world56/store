import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './common/file/file.module';
import { AuthModule } from './module/auth/auth.module';
import { UserTokenGuard } from './guard/user-token.guard';
import { SystemModule } from './module/system/system.module';
import { JwtAuthModule } from './common/jwtAuth/jwtAuth.module';
import { CategoryModule } from './common/category/category.module';
import { PurchaseModule } from './module/purchase/purchase.module';
import { WarehouseModule } from './module/warehouse/warehouse.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileModule,
    AuthModule,
    SystemModule,
    JwtAuthModule,
    WarehouseModule,
    CategoryModule,
    PurchaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserTokenGuard,
    },
  ],
})
export class AppModule {}
