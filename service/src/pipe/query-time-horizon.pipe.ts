import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

import type { TypeCommon } from '@/interface/common';

/**
 * @name QueryTimeHorizonPipe 时间查询
 * @description 仅针对MongoDB
 */
@Injectable()
export class QueryTimeHorizonPipe implements PipeTransform {
  private timeHorizonField: string = 'time';

  public constructor(timeHorizonField?: string) {
    if (timeHorizonField) {
      this.timeHorizonField = timeHorizonField;
    }
  }

  transform(
    value: TypeCommon.QueryListDefaultParam,
    metadata: ArgumentMetadata,
  ) {
    const { time, ...otherParam } = value;
    if (time?.length) {
      otherParam[this.timeHorizonField] = {
        $gte: Number(time[0]),
        $lte: Number(time[1]),
      };
    }
    return otherParam;
  }
}
