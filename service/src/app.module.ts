import { Module } from '@nestjs/common';
import { FileModule } from './common/file/file.module';
import { AuthModule } from './module/auth/auth.module';
import { UserTokenGuard } from './guard/user-token.guard';
import { SystemModule } from './module/system/system.module';
import { JwtAuthModule } from './common/jwtAuth/jwtAuth.module';
import { WarehouseModule } from './module/warehouse/warehouse.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FileModule,
    AuthModule,
    SystemModule,
    JwtAuthModule,
    WarehouseModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: UserTokenGuard,
    },
  ],
})
export class AppModule {}
