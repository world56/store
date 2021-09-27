import { CONSTANT_COMMON } from "@/constant/common";

import type { TypeCommon } from "@/interface/common";
import type { Columns, ColumnsList, CascaderList } from ".";

/**
 * @name filterSelectArray 生成选择项
 */

export function filterSelectArray(
  list: ColumnsList = [],
  obj: Partial<TypeCommon.GenericObject> = {},
) {
  if (list !== undefined && !Array.isArray(list)) {
    const { key, value, data } = list;
    const newList = data.map((v) => {
      const toRecursion = Array.isArray(v.children) && v.children.length;
      obj[v[key]] = v[value];
      return {
        key: v[key] || "unknown",
        value: v[value] || "unknown",
        children: toRecursion
          ? filterSelectArray(
              {
                key,
                value,
                data: v.children || [],
              },
              obj,
            ).list
          : [],
      };
    }) as CascaderList[];
    return { list: newList, obj };
  }
  return { list, obj };
}

/**
 * @name getPlaceholder 获取提示语
 */

export function filterPlaceholder(value: Columns) {
  return value.placeholder
    ? value.placeholder
    : `${CONSTANT_COMMON.COMPONENT_PLACEHOLDER[value.type]}${value.name}`;
}

/**
 * @name initColumns 标准化
 * @param {Array<{}>} columns
 */

export function initColumns(columns: Columns[] = []): Columns[] {
  const newColumns = [];
  if (columns.length) {
    const { length } = columns;
    for (let i = 0; i < length; i += 1) {
      const value = { ...columns[i] };
      const placeholder = filterPlaceholder(value);
      value.list = filterSelectArray(value.list as ColumnsList).list;
      value.placeholder = placeholder;
      newColumns.push(value);
    }
    return newColumns;
  }
  return columns;
}

export function searchSelect(input: string, option: { children: string }) {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}
