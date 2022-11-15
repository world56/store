import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import multipart from '@fastify/multipart';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import { HttpSucessInterceptor } from '@/interceptor/http-sucess.interceptor';

(BigInt.prototype as any).toJSON  = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useStaticAssets({
    root: join(__dirname, '../resource'),
    prefix: '/resource/',
  });
  app.register(multipart);
  app.register(fastifyRequestContextPlugin);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpSucessInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Admin Server')
    .setDescription('store admin API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
