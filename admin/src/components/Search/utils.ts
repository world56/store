import { CONSTANT_SEARCH } from "./constant";

import type { Columns } from ".";

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
