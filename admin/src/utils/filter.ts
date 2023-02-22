import type { FilterFunc } from "rc-select/lib/Select";
import type { DefaultOptionType } from "rc-select/lib/Select";
import type { ValidateErrorEntity } from "rc-field-form/es/interface";

export interface TypeNestingComp {
  children?: { props?: TypeNestingComp };
}

/**
 * @name filterOption Antd Select 组件搜索方法
 * @param input 用户输入
 * @param option 组件
 */
export function filterOption(input: string, option?: DefaultOptionType) {
  return option!.children!.toString().includes(input);
}

/**
 * @name filterOptionTooltip Antd Select 组件搜索方法 针对嵌套Tooltip
 * @param val 用户输入的
 * @param option 组件
 */
export const filterOptionTooltip: FilterFunc<TypeNestingComp> = (
  val,
  option,
) => {
  const show = (option?.children?.props!?.children?.props)?.children as
    | string
    | void;
  return show ? show.includes(val) : false;
};

/**
 * @name filterFormError 过滤Form表单的异常项（ActiveKey）跳转
 * @param error 异常对象
 * @param field 需要判断的字段
 */
export function filterFormError<T = unknown>(error: never | unknown, field: string) {
  const { errorFields } = error as ValidateErrorEntity<T>;
  return errorFields?.find((val) => {
    return val.name.find((v) => v.toString().includes(field));
  });
}
