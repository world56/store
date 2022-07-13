import { Injectable } from '@nestjs/common';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';

@Injectable()
export class UtilsService {
  /**
   * @name isRepeat 判断关键字目标是否重复
   * @param list sql返回的查询结果
   * @param id 客户端传递过来的id
   * @returns true:重复 false:未重复
   */
  isRepeat(list: Array<PrimaryKeyDTO> = [], id: number) {
    const [target] = list;
    return !Boolean(!target || (list.length === 1 && target?.id === id));
  }

  /**
   * @name getSingleIds 数组 获取非重复ids
   */
  getSingleIds(ids: Array<number | string>) {
    return ids.filter((v) => ids.indexOf(v) === ids.lastIndexOf(v));
  }

  private readonly voids = ['', undefined, null, NaN];

  notVoid = (val: any) => {
    return !this.voids.includes(val);
  };

  isVoid(val: any) {
    return this.voids.includes(val);
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
   * @name filterArrayRepeatKeys 数组 过滤l、r相互重复的key (insert、delete)
   * @param dtoData client dto data
   * @param serviceData db server data
   * @param toId 是否返回Array<{ id:number; }>;
   */
  filterArrayRepeatKeys(
    dtoData: number[],
    serviceData: number[],
  ): Array<number[]>;
  filterArrayRepeatKeys(
    dtoData: number[],
    serviceData: number[],
    toId: boolean,
  ): Array<{ id: number }[]>;
  filterArrayRepeatKeys(
    dtoData: number[],
    serviceData: number[],
    toId?: boolean,
  ) {
    const map = this.getArrayRepeatKeys(
      [...dtoData, ...serviceData].filter(this.notVoid),
    );
    const insert = dtoData.filter((v) => map[v] === 1);
    const del = serviceData.filter((v) => map[v] === 1);
    return toId
      ? [insert.map((id) => ({ id })), del.map((id) => ({ id }))]
      : [insert, del];
  }

  /**
   * @name filterGrouping 条件过滤分离数组 （update、create）
   * @description [trues 有id（update）的对象] [falses 无id（insert）的对象]
   */
  filterGrouping<T extends { id?: number }>(
    list: Array<T>,
    callback: (val: T) => boolean | string | number,
  ) {
    const trues: T[] = [];
    const falses: T[] = [];
    list.forEach((v) => {
      if (callback(v)) {
        trues.push(v);
      } else {
        falses.push(v);
      }
    });
    return [trues, falses];
  }
}
