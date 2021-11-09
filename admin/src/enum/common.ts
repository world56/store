/**
 * @name ENUM_COMMON 枚举-通用枚举
 */
export namespace ENUM_COMMON {
  /**
   * @name COMPONENT_TYPE Search支持的组件类型
   * @param INPUT 文本输入框
   * @param SELECT 下拉选择框
   * @param CASCADER 级联多级选择器
   * @param TIME_SCOPE 时间选择
   */
  export enum COMPONENT_TYPE {
    INPUT = "INPUT",
    SELECT = "SELECT",
    CASCADER = "CASCADER",
    TIME_SCOPE = "TIME_SCOPE",
  }

  /**
   * @name COMPONENT_TO_VALUE 组件键值对
   */
  export enum COMPONENT_TO_VALUE {
    KEY = "KEY",
    VALUE = "VALUE",
  }

  /**
   * @name STATUS 状态
   * @param FREEZE 冻结
   * @param ACTIVATE 激活
   */
  export enum STATUS {
    FREEZE,
    ACTIVATE,
  }
}
