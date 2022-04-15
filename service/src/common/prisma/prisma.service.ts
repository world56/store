import { PrismaClient } from '@prisma/client';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

// import type { Prisma } from 'prisma/prisma-client';

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
