import dayjs from "dayjs";
import { CONFIG_TIME_FORMAT } from "@/config/format";

import type { TypeCommon } from "@/interface/common";

export interface TypeDefaultConversionFields
  extends Pick<TypeCommon.DTO, "id" | "name" | "parentId"> {}

/**
 * @name isVoid 判断值是否为void
 */
export function isVoid(param: unknown): param is boolean {
  return param === undefined || param === null || param === "";
}

/**
 * @name timestampToTime 时间戳转成标准时间格式
 * @description 只能用作于时间戳
 * @returns {string} 输出格式为 YYYY-MM-DD HH:mm:ss
 */
export function timestampToTime(timestamp?: number): string {
  return timestamp ? dayjs(timestamp).format(CONFIG_TIME_FORMAT.STANDARD) : "-";
}

/**
 * @name listToTree 生成树
 * @param list service data
 */
export function listToTree<
  T extends TypeDefaultConversionFields = TypeDefaultConversionFields,
>(list: T[] = [], parentId = 0, id?: number): T[] {
  let parentObj: TypeCommon.GenericObject<T> = {};
  list.forEach((o) => (parentObj[o.id] = o));
  return list
    .filter((v) =>
      parentId ? v.parentId === parentId : !parentObj[v.parentId],
    )
    .map((o) => ({
      ...parentObj[o.id],
      disabled: o.id === id,
      children: listToTree(list, o.id, id),
    }));
}

/**
 * @name toDictionaries 转成字典结构
 */
export function toDictionaries<
  T extends TypeDefaultConversionFields = TypeDefaultConversionFields,
>(data: T[] = []) {
  const OBJ: TypeCommon.GenericObject = {};
  const LIST = data.map((v) => {
    OBJ[v.id] = v.name;
    return { key: v.id, value: v.name, ...v };
  });
  return { OBJ, LIST };
}

/**
 *
 * @name createRandNum 生成随机数
 * @param length 随机数个数
 */
export function createRandNum(length: number = 10) {
  const nums = [];
  let temp;
  while (nums.length < length) {
    temp = Math.floor(Math.random() * length);
    if (nums.indexOf(temp) === -1) {
      nums[nums.length] = temp;
    }
  }
  return nums;
}
