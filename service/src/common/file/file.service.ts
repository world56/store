import { promisify } from 'util';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import { createWriteStream } from 'fs';
import { FileDTO } from '@/dto/file.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import StaticResourcesConfig from '@/config/static-resources.config';

import { type Multipart } from '@fastify/multipart';
import { AdminUserDTO } from '@/dto/admin-user.dto';

@Injectable()
export class FileService {
  private readonly pump = promisify(pipeline);

  public constructor(
    private readonly PrismaService: PrismaService,
    private readonly ConfigService: ConfigService<
      ReturnType<typeof StaticResourcesConfig>
    >,
  ) {}

  private tranformName(name: string) {
    return `${createHash('md5')
      .update(name + new Date().valueOf().toString())
      .digest('hex')}${extname(name)}`;
  }

  private async relationFiles(data: FileDTO) {
   return await this.PrismaService.files.create({ data });
  }

  async upload(data: Multipart, { id }: AdminUserDTO) {
    const { filename, mimetype } = data;
    const filePath = this.tranformName(filename);
    const [,file] = await Promise.all([
      this.pump(
        data.file,
        createWriteStream(
          join(this.ConfigService.get<string>('path'), filePath),
        ),
      ),
      this.relationFiles({
        userId: id,
        url: filePath,
        name: filename,
        type: mimetype.split('/').shift(),
      }),
    ]);
    return file.url;
  }
}
