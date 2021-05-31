import { Module } from '@nestjs/common';
import { SecretService } from './service/secret.service';

@Module({
  providers: [SecretService],
  exports: [SecretService],
})
export class CommonModule {}
