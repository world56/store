import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { message } = exception;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send({ content: null, message, code: 1 });
  }
}
