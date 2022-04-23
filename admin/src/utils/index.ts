import dayjs from "dayjs";
import { CONFIG_TIME_FORMAT } from "@/config/format";

import type { TypeCommon } from "@/interface/common";
import type { TypeSystemPermission } from "@/interface/system/permission";

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
export function listToTree(
  list: TypeSystemPermission.DTO[] = [],
  parentId = 0,
  id?: number,
): TypeSystemPermission.DTO[] {
  let parentObj: TypeCommon.GenericObject<TypeSystemPermission.InfoTree> = {};
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
 * @name dataToDictionaries 转成字典结构
 */
export function dataToDictionaries<
  T extends Pick<TypeCommon.DTO, "id" | "parentId" | "name">,
>(data: T[] = []) {
  const obj: TypeCommon.GenericObject = {};
  const list = data.map((v) => {
    obj[v.id] = v.name;
    return { key: v.id, value: v.name, parentId: v.parentId };
  });
  return { obj, list };
}
