import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * @name ConvertCurrencyUnitsPipe 转换货币单位（元转换为分 * 100）
 */
@Injectable()
export class ConvertCurrencyUnitsPipe implements PipeTransform {
  private location: string[] = [];

  public constructor(location: string[]) {
    this.location = location;
  }

  private getValues(value, loc: string[]) {
    const [key, ...nextLoc] = loc;
    return nextLoc.length ? value[key] : this.getValues(value[key], nextLoc);
  }

  public transform(value, metadata: ArgumentMetadata) {
    if (value) {
      const target = this.getValues(value, this.location);
      const key = this.location.at(-1);
      if (Array.isArray(target)) {
        target.forEach((v) => (v[key] = v[key] * 100));
      } else {
        target[key] = target[key] * 100;
      }
    }
    return value;
  }
}
