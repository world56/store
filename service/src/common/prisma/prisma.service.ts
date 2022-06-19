import {
  Injectable,
  OnModuleInit,
  INestApplication,
  PreconditionFailedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';

interface TypeCheckFieldsRepeatDTO extends Partial<PrimaryKeyDTO> {
  WHERE?: object;
}

/**
 * @description MySql
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // this.createMiddleware();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async checkFieldsRepeat<T extends TypeCheckFieldsRepeatDTO>(
    relName: string,
    DTO: T,
    tips?: boolean,
  ) {
    const { WHERE, ...find } = DTO;
    const OR = Object.entries(find).map(([k, v]) => ({ [k]: v }));
    const list = await this[relName].findMany({ where: { ...WHERE, OR } });
    const [target] = list;
    const isRepeat = !Boolean(
      !target || (list.length === 1 && target?.id === DTO.id),
    );
    if (tips && isRepeat) {
      throw new PreconditionFailedException('字段值存在重复，无法保存');
    }

    return isRepeat;
  }

  // private createMiddleware() {
  //   // this.$use(this.cleanUpMeaninglessParameters);
  // }

  // private readonly cleanUpMeaninglessParameters: Prisma.Middleware = async (
  //   params,
  //   next,
  // ) => {
  //   const filterParams = this.filterParameters(params);
  //   const result = await next(filterParams);
  //   return result;
  // };

  // isVoid(val: unknown) {
  //   return val === undefined || val === '';
  // }

  // private filterParameters(params: Prisma.MiddlewareParams) {
  //   const OR = params?.args?.where?.OR || [];
  //   if (OR.length) {
  //     const OR_FILTER = OR.filter(
  //       (v) =>
  //         Object.keys(v).filter(
  //           (val) =>
  //             v[val].hasOwnProperty('contains') &&
  //             !this.isVoid(v[val].contains),
  //         ).length,
  //     );
  //     params.args.where.OR = OR_FILTER.length ? OR_FILTER : undefined;
  //   }
  //   return params;
  // }
}
