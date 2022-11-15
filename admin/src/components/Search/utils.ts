import { isVoid } from "@/utils";

import { ENUM_SEARCH } from "./enum";
import { CONSTANT_SEARCH } from "./constant";

import type { Columns } from ".";
import type { URLSearchParamsInit } from "react-router-dom/dist/dom";

type TypeQueryDefaultValue = number | number[] | string | undefined | null;

/**
 * @name getPlaceholder 获取提示语
 */
export function filterPlaceholder(value: Columns) {
  return value.placeholder
    ? value.placeholder
    : `${CONSTANT_SEARCH.COMPONENT_PLACEHOLDER[value.type]}${value.label}`;
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

/**
 * @name filterFormQueryValue 过滤Form表单值为浏览器Query值
 */
export function filterFormQueryValue(
  query: URLSearchParams,
  value: Record<string, string>,
) {
  const pageSize = query.get("pageSize") as string;
  const currentPage = query.get("currentPage") as string;
  const clear: string[] = [];
  const update: URLSearchParamsInit = {};
  Object.entries({ ...value, pageSize, currentPage }).forEach(([k, v]) => {
    if (isVoid(v)) {
      clear.push(k);
    } else {
      update[k] = v;
    }
  });
  return { clear, update };
}

/**
 * @name getInitQuery 获取Query的初始值
 * @description query参数可能存在元祖类型的情况，需要根据组件类型进行判断
 */
export function getInitQuery(query: URLSearchParams, columns: Columns[]) {
  const store: Record<string, TypeQueryDefaultValue> = {};
  const length = columns.length;
  for (let i = 0; i < length; i++) {
    const column = columns[i];
    let value: TypeQueryDefaultValue;
    switch (column.type) {
      case ENUM_SEARCH.COMP_TYPE.TIME_SCOPE:
      case ENUM_SEARCH.COMP_TYPE.TREE_SELECT:
        const params = query.getAll(column.name).filter(Boolean);
        value = params.length ? params.map((v) => Number(v)) : undefined; // 目前默认都是Int类型
        break;
      case ENUM_SEARCH.COMP_TYPE.SELECT:
        const val = query.get(column.name);
        const transform = isVoid(val) ? undefined : Number(val);
        value = Number.isNaN(transform) ? undefined : transform;
        break;
      default:
        const defaultParam = query.get(column.name);
        value = isVoid(defaultParam) ? undefined : query.get(column.name);
        break;
    }
    if (!isVoid(value)) {
      store[column.name] = value;
    }
  }
  return store;
}
