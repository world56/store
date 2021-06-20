import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';

@Module({
  exports: [SecretService],
  providers: [SecretService],
})
export class SecretModule {}
