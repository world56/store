import { join } from 'path';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { HttpSucessInterceptor } from '@/interceptor/http-success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpSucessInterceptor());
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/resource/',
  });
  await app.listen(9991);
}

bootstrap();
