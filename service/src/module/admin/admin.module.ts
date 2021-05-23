import { Module } from '@nestjs/common';
import { UserModule } from '@/module/admin/user/user.module';

@Module({
  imports: [UserModule],
})
export class AdminModule {}
