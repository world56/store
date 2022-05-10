export namespace ENUM_SEARCH {
  /**
   * @name COMP_TYPE Search支持的组件类型
   * @param INPUT 文本输入框
   * @param SELECT 下拉选择框
   * @param CASCADER 级联多级选择器
   * @param TREE_SELECT 级联单选
   * @param TIME_SCOPE 时间选择
   */
  export enum COMP_TYPE {
    INPUT = "INPUT",
    SELECT = "SELECT",
    CASCADER = "CASCADER",
    TIME_SCOPE = "TIME_SCOPE",
    TREE_SELECT = "TREE_SELECT",
  }

  /**
   * @name COMPONENT_VALUE_TYPE 组件键值对
   */
  export enum COMPONENT_VALUE_TYPE {
    KEY = "KEY",
    VALUE = "VALUE",
  }
}
