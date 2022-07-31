import {
  Injectable,
  OnModuleInit,
  INestApplication,
  PreconditionFailedException,
} from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { type Prisma, PrismaClient } from '@prisma/client';

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
    this.createNO('createNO');
    // this.createMiddleware();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  /**
   * @name checkFieldsRepeat 字段查重
   * @param tableName table
   * @returns
   */
  async checkFieldsRepeat<T extends TypeCheckFieldsRepeatDTO>(
    tableName: string,
    DTO: T,
    tips?: boolean,
  ) {
    const { WHERE, ...find } = DTO;
    const OR = Object.entries(find).map(([k, v]) => ({ [k]: v }));
    const list = await this[tableName].findMany({ where: { ...WHERE, OR } });
    const [target] = list;
    const isRepeat = !Boolean(
      !target || (list.length === 1 && target?.id === DTO.id),
    );
    if (tips && isRepeat) {
      throw new PreconditionFailedException('字段值存在重复，无法保存');
    }

    return isRepeat;
  }

  /**
   * @name createNO 创建流水号
   * @param tableName table
   */
  async createNO(tableName: string) {
    const [val]: object[] = await this.$queryRaw`
    select 
      concat('NO',date_format(now(),'%Y%m%d') , 
      lpad(max(right('id' , 4)) + 1 , 4 , 0)) 
    from 
      purchase_order; 
    `;
  }

  // private softDeleteTable: ReadonlyArray<string> = ['SupplierProduct'];

  // private softDeleting: Prisma.Middleware = async (params, next) => {
  //   const { action, model } = params;
  //   console.log('@-model', model, '-', action);
  //   if (this.softDeleteTable.includes(model)) {
  //     switch (action) {
  //       case 'delete':
  //         params.action = 'update';
  //         params.args.data = { deleted: true };
  //         break;
  //       case 'deleteMany':
  //         params.action = 'updateMany';
  //         if (params.args.data != undefined) {
  //           params.args.data.deleted = true;
  //         } else {
  //           params.args.data = { deleted: true };
  //         }
  //         break;
  //       case 'findUnique':
  //       case 'findFirst':
  //         params.action = 'findFirst';
  //         params.args.where['deleted'] = false;
  //         break;
  //       case 'findMany':
  //         if (params.args.where) {
  //           if (!params.args.where.deleted) {
  //             params.args.where['deleted'] = false;
  //           }
  //         } else {
  //           params.args['where'] = { deleted: false };
  //         }
  //         break;
  //       case 'update':
  //         params.action = 'updateMany';
  //         params.args.where['deleted'] = false;
  //         break;
  //       case 'updateMany':
  //         if (params.args.where) {
  //           params.args.where['deleted'] = false;
  //         } else {
  //           params.args['where'] = { deleted: false };
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   return next(params);
  // };

  // private createMiddleware() {
  //   this.$use(this.softDeleting);
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
