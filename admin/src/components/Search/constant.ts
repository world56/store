import { ENUM_SEARCH } from "./enum";

export namespace CONSTANT_SEARCH {
  export const COMPONENT_PLACEHOLDER = Object.freeze({
    [ENUM_SEARCH.COMP_TYPE.INPUT]: "请输入",
    [ENUM_SEARCH.COMP_TYPE.SELECT]: "请选择",
    [ENUM_SEARCH.COMP_TYPE.CASCADER]: "请选择",
    [ENUM_SEARCH.COMP_TYPE.TIME_SCOPE]: "请选择",
    [ENUM_SEARCH.COMP_TYPE.TREE_SELECT]: "请选择",
  } as const);
}
