import { Injectable } from '@nestjs/common';
import { TypeCommon } from '@/interface/common';
import { PrimaryKeyDTO } from '@/dto/common.dto';

@Injectable()
export class UtilsService {
  /**
   * @name isRepeat 判断关键字目标是否重复
   * @param list sql返回的查询结果
   * @param id 客户端传递过来的id
   * @returns true:重复 false:未重复
   */
  isRepeat(list: Array<PrimaryKeyDTO> = [], id: number): boolean {
    const [target] = list;
    return !Boolean(!target || (list.length === 1 && target?.id === id));
  }

  /**
   * @name getSingleIds 数组 非重复ids
   */
  getSingleIds(ids: Array<number | string>) {
    return ids.filter((v) => ids.indexOf(v) === ids.lastIndexOf(v));
  }

  /**
   * @name getArrayRepeatKeys 数组 重复出现的字段次数
   */
  getArrayRepeatKeys(
    list: Array<number | string>,
  ): Record<string | number, number> {
    return list.reduce((prev, next) => {
      prev[next] = prev[next] + 1 || 1;
      return prev;
    }, {});
  }

  /**
   * @name filterArrayRepeatKeys 数组 过滤l、r相互重复的key
   * @param l client data
   * @param r db data
   */
  filterArrayRepeatKeys<T extends TypeCommon.ArrayKeys>(l: T, r: T) {
    const map = this.getArrayRepeatKeys([...l, ...r]);
    return [l.filter((v) => map[v] === 1), r.filter((v) => map[v] === 1)];
  }

  isVoid(val: unknown) {
    return val === '' || val === undefined || val === null;
  }
}
