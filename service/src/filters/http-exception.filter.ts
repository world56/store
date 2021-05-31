import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
// import {Response} from '@nestjs/platform-fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse()
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        code: exception.getStatus(),
        message: exception.message,
      });
  }
}
