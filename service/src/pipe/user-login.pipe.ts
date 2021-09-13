import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, validate } from 'class-validator';

import type * as UserType from '@/interface/user';

export class UserLoginValidator
  implements UserType.AdminUser.LoginAccountSecret
{
  @IsString()
  account: string;

  @IsString()
  password: string;
}

@Injectable()
export class UserLoginPipe implements PipeTransform {
  async transform(
    value: UserType.AdminUser.LoginAccountSecret,
    metadata: ArgumentMetadata,
  ) {
    const format = plainToClass(UserLoginValidator, value);
    const errors = await validate(format);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
