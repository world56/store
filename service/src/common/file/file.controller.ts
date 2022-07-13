import { User } from '@/decorator/user';
import { FileService } from './file.service';
import { RemoveFilesDTO } from './dto/remove-files.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { UploadFileGuard } from '@/guard/upload-file.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUploadFiles } from '@/decorator/get-upload-file.decorator';

import { type Multipart } from '@fastify/multipart';

@Controller('file')
export class FileController {
  public constructor(private readonly FileService: FileService) {}

  @Post('uploads')
  @UseGuards(new UploadFileGuard())
  upload(@GetUploadFiles() file: Multipart, @User() user: AdminUserDTO) {
    return this.FileService.upload(file, user);
  }

  @Post('remove')
  remove(@Body() body: RemoveFilesDTO) {
    return this.FileService.remove(body);
  }
}
