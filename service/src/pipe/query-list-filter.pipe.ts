import {
  Injectable,
  HttpStatus,
  PipeTransform,
  HttpException,
  ArgumentMetadata,
} from '@nestjs/common';
import { Type, plainToClass } from 'class-transformer';
import { IsInt, validate, Min } from 'class-validator';

import { DB_PRIMARY_KEY } from '@/config/db';

import { TypeCommon } from '@/interface/common';

interface TypeQueryTableListFilter extends TypeCommon.QueryListDefaultParam {}

class ValidatorQueryTableListFilter implements TypeCommon.PageTurning {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  currentPage: number;
}

/**
 * @name QueryListFilterPipe 查询列表过滤
 */
@Injectable()
export class QueryListFilterPipe<T extends TypeQueryTableListFilter>
  implements PipeTransform
{
  private filterTypes: ReadonlyArray<unknown> = [null, undefined, NaN, ''];

  private excludeFields: string[] = [
    'time',
    'pageSize',
    'currentPage',
    DB_PRIMARY_KEY,
  ];

  constructor(excludeFields?: string[]) {
    if (excludeFields) {
      this.excludeFields = [...this.excludeFields, ...excludeFields];
    }
  }

  private notVoid(val: unknown) {
    return !this.filterTypes.includes(val);
  }

  private basicTypeConversion(query: Partial<T>) {
    query.pageSize = Number(query.pageSize);
    query.currentPage = Number(query.currentPage);
    query.pageSkip = (query.currentPage - 1) * query.pageSize;
    return query;
  }

  private filterCreateDBSearch(query: T) {
    const params: Partial<T> = {};
    for (const [key, val] of Object.entries(query)) {
      if (this.notVoid(val)) {
        if (this.excludeFields.includes(key)) params[key] = val;
        else params[key] = { $regex: val };
      }
    }
    return this.basicTypeConversion(params);
  }

  public async transform(value: T, metadata: ArgumentMetadata) {
    const format = plainToClass(ValidatorQueryTableListFilter, value);
    const errors = await validate(format);
    if (errors.length) {
      throw new HttpException(errors.toString(), HttpStatus.NOT_ACCEPTABLE);
    }
    return this.filterCreateDBSearch(value);
  }
}
