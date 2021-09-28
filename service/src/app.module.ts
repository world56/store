import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_ADDRESS } from '@/config/database';
import { AdminModule } from '@/module/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
    }),
    AdminModule,
  ]
})
export class AppModule {}
