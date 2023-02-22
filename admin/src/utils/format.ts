import dayjs from "dayjs";

import { CONFIG_TIME_FORMAT } from "@/config/format";

import type { Key } from "react";
import type { TypeCommon } from "@/interface/common";

export type TypeCategoryParam = Pick<TypeCommon.DTO, "id" | "name" | "remark"> &
  Record<number, Key> & {
    parentId?: number;
    remark?: string;
  };

/**
 * @name toTime 时间戳转成标准时间格式
 * @description 只能用作于时间戳
 * @returns {string} 输出格式为 YYYY-MM-DD HH:mm:ss
 */
export function toTime(timestamp?: number | Date | string): string {
  return timestamp ? dayjs(timestamp).format(CONFIG_TIME_FORMAT.STANDARD) : "-";
}

/**
 * @name listToTree 生成树
 * @param list service data
 */
export function listToTree<
  T extends Pick<TypeCommon.DTO, "id" | "name" | "parentId">,
>(list: T[] = [], parentId = 0, id?: number): T[] {
  let parentObj: TypeCommon.GenericObject<T> = {};
  list.forEach((o) => (parentObj[o.id] = o));
  return list
    .filter((v) =>
      parentId ? v.parentId === parentId : !parentObj[v.parentId!],
    )
    .map((o) => ({
      ...parentObj[o.id],
      disabled: o.id === id,
      children: listToTree(list, o.id, id),
    }));
}

/**
 * @name toCategorys 转为标准字典类型
 */
export function toCategorys<
  T extends Pick<TypeCommon.DTO, "id" | "name" | "remark"> = Pick<
    TypeCommon.DTO,
    "id" | "name" | "remark"
  >,
>(LIST: T[]) {
  return { LIST, OBJ: Object.fromEntries(LIST.map((v) => [v.id, v])) };
}

/**
 * @name monetaryUnit 转换货币单位（分-元）
 * @param money 分
 * @returns 元
 */
export function monetaryUnit(money: number = 0) {
  return money / 100;
}

/**
 * @name urlSearchParams 转换query参数
 */
export function urlSearchParams(params: Record<string, unknown>) {
  const query = Object.entries(params).filter(([k, v]) => v);
  if (query.length) {
    const str = query.reduce((total, val) => `${total}${val.join("=")}&`, "?");
    return str.substring(0, str.length - 1);
  }
  return undefined;
}
