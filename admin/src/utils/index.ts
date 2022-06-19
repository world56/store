import dayjs from "dayjs";

import { ENUM_COMMON } from "@/enum/common";
import { CONFIG_TIME_FORMAT } from "@/config/format";

import type { TypeCommon } from "@/interface/common";
import type { FilterFunc } from "rc-select/lib/Select";
import type { FormListFieldData } from "antd/es/form/FormList";

interface TypeNestingComp {
  children?: { props?: TypeNestingComp };
}

export interface TypeDefaultConversionFields
  extends Pick<TypeCommon.DTO, "id" | "name" | "parentId"> {}

/**
 * @name isVoid 判断值是否为void
 */
export function isVoid(param: unknown): param is boolean {
  return param === undefined || param === null || param === "";
}

/**
 * @name toTime 时间戳转成标准时间格式
 * @description 只能用作于时间戳
 * @returns {string} 输出格式为 YYYY-MM-DD HH:mm:ss
 */
export function toTime(timestamp?: number | string): string {
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
    return v;
  });
  return { OBJ, LIST };
}

/**
 *
 * @name createRandNum 生成随机数
 * @param length 随机数个数
 */
export function createRandNum(length: number = 10) {
  const num: number[] = [];
  for (let i = 0; i <= length; i++) {
    num.push(Math.floor(Math.random() * 10));
  }
  return num;
}

/**
 * @name formNestedFields 生成表单嵌套字段
 */
export function formNestedFields(itemProps: FormListFieldData, name: string) {
  return {
    name: itemProps ? [itemProps.name, name] : name,
    fieldKey: itemProps ? [itemProps.key, name] : name,
  };
}

/**
 * @name statusReversal 反转状态
 */
export function statusReversal(status: ENUM_COMMON.STATUS | undefined) {
  return status === ENUM_COMMON.STATUS.ACTIVATE
    ? ENUM_COMMON.STATUS.FREEZE
    : ENUM_COMMON.STATUS.ACTIVATE;
}

/**
 * @name filterSelectTooltip 针对Select筛选嵌套Tooltip组件
 * @param val 用户输入的
 * @param props Select返回的
 */
export const filterSelectTooltip: FilterFunc<TypeNestingComp> = (val, props) => {
  const show = props?.children?.props!?.children?.props?.children as
    | string
    | void;
  return show ? show.includes(val) : false;
};
