import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpSucessInterceptor());
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/resource/',
  });
  await app.listen(3001);
}

bootstrap();
