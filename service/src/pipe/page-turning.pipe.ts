import {
  HttpStatus,
  Injectable,
  PipeTransform,
  HttpException,
  ArgumentMetadata,
} from '@nestjs/common';
import { Type, plainToClass } from 'class-transformer';
import { IsInt, validate, Min } from 'class-validator';

import type { TypeCommon } from '@/interface/common';

class ValidatorPageTurning implements TypeCommon.PageTurning {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  currentPage: number;
}

@Injectable()
export class PageTurningPipe implements PipeTransform {
  public async transform(
    value: TypeCommon.PageTurning,
    metadata: ArgumentMetadata,
  ) {
    const format = plainToClass(ValidatorPageTurning, value);
    const errors = await validate(format);
    if (errors.length) {
      throw new HttpException(errors.toString(), HttpStatus.NOT_ACCEPTABLE);
    }
    value.pageSize = Number(value.pageSize);
    value.currentPage = Number(value.currentPage);
    return value;
  }
}
