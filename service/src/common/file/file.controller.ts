import { User } from '@/decorator/user';
import { FileService } from './file.service';
import { UploadFileGuard } from '@/guard/upload-file.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { GetUploadFiles } from '@/decorator/get-upload-file.decorator';

import { type Multipart } from '@fastify/multipart';
import { AdminUserDTO } from '@/dto/admin-user.dto';

@Controller('file')
export class FileController {
  public constructor(private readonly FileService: FileService) {}

  @Post('uploads')
  @UseGuards(new UploadFileGuard())
  upload(@GetUploadFiles() file: Multipart, @User() user: AdminUserDTO) {
    return this.FileService.upload(file, user);
  }
}
