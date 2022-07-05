import type { FilterFunc } from "rc-select/lib/Select";
import type { DefaultOptionType } from "rc-select/lib/Select";

interface TypeNestingComp {
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
  const show = option?.children?.props!?.children?.props?.children as
    | string
    | void;
  return show ? show.includes(val) : false;
};
