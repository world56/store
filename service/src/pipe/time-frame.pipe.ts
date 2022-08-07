import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

export type TypeTimeFramePipeTransformation<T, K extends keyof any> = Omit<
  T,
  K
> & {
  [P in K]?: { gte: Date; lt: Date };
};

/**
 * @name TimeFramePipe 时间范围转换
 * @param fields 需要转换的字段
 * @descriptin 转换为Prisma查询格式
 */
@Injectable()
export class TimeFramePipe<T extends string[] = string[]>
  implements PipeTransform
{
  private readonly fields: T;

  public constructor(fields: T) {
    this.fields = fields;
  }

  transform(value: Record<string, unknown>, metadata: ArgumentMetadata) {
    const keys = Object.keys(value);
    this.fields.forEach((key) => {
      const val = value[key];
      if (keys.includes(key) && Array.isArray(val)) {
        const [start, end] = val;
        value[key] = { gte: new Date(start), lt: new Date(end) };
      }
    });
    return value;
  }
}
