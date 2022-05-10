import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './file.controller';
import { PrismaModule } from '../prisma/prisma.module';
import StaticResourcesConfig from '@/config/static-resources.config';

@Module({
  imports: [PrismaModule, ConfigModule.forFeature(StaticResourcesConfig)],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
