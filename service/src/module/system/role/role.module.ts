import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UtilsModule } from '@/common/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
