import { HttpException } from '@nestjs/common';

/**
 * @name StatusFreezingException 通常指某条记录被冻结
 * @description HTTP CODE 419
 */
export class StatusFreezingException extends HttpException {
  public constructor(message: string = '该状态已经被冻结') {
    super(message, 419);
  }
}
