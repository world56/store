import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

type UndefinedToNullPipeParam = Record<string, unknown>;

@Injectable()
export class UndefinedToNullPipe<T extends UndefinedToNullPipeParam>
  implements PipeTransform
{
  valueIsObject(value: T) {
    return Object.prototype.toString.apply(value) === '[object Object]';
  }

  transform(value: T, metadata: ArgumentMetadata) {
    if (this.valueIsObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, v === undefined ? null : v]),
      );
    }
    return value;
  }
}
