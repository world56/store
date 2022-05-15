import { promisify } from 'util';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import { FileDTO } from '@/dto/file.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminUserDTO } from '@/dto/admin-user.dto';
import { stat, unlink, createWriteStream } from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import StaticResourcesConfig from '@/config/static-resources.config';

import { ENUM_COMMON } from '@/enum/common';

import { type Multipart } from '@fastify/multipart';
import { RemoveFilesDTO } from './dto/remove-files.dto';

@Injectable()
export class FileService {
  private readonly pump = promisify(pipeline);

  public constructor(
    private readonly PrismaService: PrismaService,
    private readonly ConfigService: ConfigService<
      ReturnType<typeof StaticResourcesConfig>
    >,
  ) {}

  private fileBasicInfo(name: string) {
    const ext = extname(name);
    const type =
      this.ConfigService.get('type')[ext.toLocaleUpperCase()] ||
      ENUM_COMMON.FILE_TYPE.OTHER;
    const path = `${createHash('md5')
      .update(name + new Date().valueOf().toString())
      .digest('hex')}${ext}`;
    return { type, path, name };
  }

  private storagePath(path: string) {
    return join(this.ConfigService.get('path'), path);
  }

  private async relationFiles(data: FileDTO) {
    return await this.PrismaService.files.create({ data });
  }

  async upload(data: Multipart, { id }: AdminUserDTO) {
    const { name, path, type } = this.fileBasicInfo(data.filename);
    const [, file] = await Promise.all([
      this.pump(data.file, createWriteStream(this.storagePath(path))),
      this.relationFiles({ path, name, type, userId: id }),
    ]);
    return file;
  }

  async remove({ ids }: RemoveFilesDTO) {
    const list = await this.PrismaService.files.findMany({
      where: { id: { in: ids } },
    });
    list?.forEach((v) => {
      const path = this.storagePath(v.path);
      stat(path, (e, s) => s.isFile() && unlink(path, () => {}));
    });
    await this.PrismaService.files.deleteMany({
      where: { id: { in: list.map((v) => v.id) } },
    });
    return true;
  }
}
