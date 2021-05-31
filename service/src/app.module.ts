import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_ADDRESS } from '@/config/database';
import { AdminModule } from './module/admin/admin.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    AdminModule,
    CommonModule,
  ],
})
export class AppModule {}
