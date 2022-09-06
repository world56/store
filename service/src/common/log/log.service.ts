import { Model } from 'mongoose';
import { Log } from './schema/Log';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogDTO } from '@/dto/common/Log.dto';
import { requestContext } from '@fastify/request-context';

@Injectable()
export class LogService {
  public constructor(
    @InjectModel(Log.name) private readonly LogModel: Model<Log>,
  ) {}

  async insert(dto: LogDTO) {
    const user = requestContext.get('user');
    console.log('@-user', user);
    return await this.LogModel.create(dto);
  }

  async getList() {}
}
