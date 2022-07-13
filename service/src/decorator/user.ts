import { requestContext } from '@fastify/request-context';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => requestContext.get('user'),
);
