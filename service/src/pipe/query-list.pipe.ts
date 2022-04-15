import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

interface QueryListPipeParam
  extends Record<'currentPage' | 'pageSize' | 'take' | 'skip', number> {}

/**
 * @name QueryListPipe 翻页参数转换
 * @param pageSize to take
 * @param currentPage to skip
 * @description 转换成prisma翻页参数
 */
@Injectable()
export class QueryListPipe<T extends QueryListPipeParam>
  implements PipeTransform
{
  private pagingParameters(value: T) {
    const { pageSize, currentPage, ...other } = value;
    other.take = pageSize;
    other.skip = (currentPage - 1) * pageSize;
    return other;
  }

  public transform(value: T, metadata: ArgumentMetadata) {
    return value.currentPage ? this.pagingParameters(value) : value;
  }
}
