import { Model } from 'mongoose';
import { Log } from '@/schema/log.shcema';
import { InjectModel } from '@nestjs/mongoose';
import { InsertLogDTO } from './dto/insert-log.dto';
import { QueryLogListDTO } from './dto/query-log-list.dto';
import { requestContext } from '@fastify/request-context';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class LogService {
  public constructor(
    @InjectModel('pruchaseLog') private readonly pruchaseLogModel: Model<Log>,
  ) {}

  private getModel(type: ENUM_COMMON.LOG_MODULE) {
    switch (type) {
      case ENUM_COMMON.LOG_MODULE.PURCHASE:
        return this.pruchaseLogModel;
      default:
        throw new BadRequestException('模块参数错误');
    }
  }

  insert(body: InsertLogDTO) {
    const { module, ...dto } = body;
    const { id: creatorId }: AdminUserDTO = requestContext.get('user');
    return this.getModel(module).create({ ...dto, creatorId });
  }

  getLogs(dto: QueryLogListDTO) {
    const { module, relationId } = dto;
    return this.getModel(module).find({ relationId });
  }
}
