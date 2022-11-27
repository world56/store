import { Model } from 'mongoose';
import { Log } from '@/schema/log.shcema';
import { InjectModel } from '@nestjs/mongoose';
import { requestContext } from '@fastify/request-context';
import { BadRequestException, Injectable } from '@nestjs/common';

import { InsertLogDTO } from './dto/insert-log.dto';
import { AdminUserDTO } from '@/dto/system/admin-user.dto';
import { QueryLogListDTO } from './dto/query-log-list.dto';

import { ENUM_COMMON } from '@/enum/common';

@Injectable()
export class LogService {
  public constructor(
    @InjectModel('pruchaseLog') private readonly pruchaseLogModel: Model<Log>,
    @InjectModel('supplierLog') private readonly supplierLogModel: Model<Log>,
  ) {}

  private getModel(type: ENUM_COMMON.LOG_MODULE) {
    switch (type) {
      case ENUM_COMMON.LOG_MODULE.PURCHASE:
        return this.pruchaseLogModel;
      case ENUM_COMMON.LOG_MODULE.SUPPLIER:
        return this.supplierLogModel;
      default:
        throw new BadRequestException('日志参数错误');
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
