import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, validate } from 'class-validator';

import type { TypeSystemUser } from '@/interface/system/user';

class UserLoginValidator implements TypeSystemUser.LoginAccountSecret {
  @IsString()
  account: string;

  @IsString()
  password: string;
}

@Injectable()
export class UserLoginPipe implements PipeTransform {
  async transform(
    value: TypeSystemUser.LoginAccountSecret,
    metadata: ArgumentMetadata,
  ) {
    const format = plainToClass(UserLoginValidator, value);
    const errors = await validate(format);
    if (errors.length) throw new BadRequestException(errors);
    return value;
  }
}
