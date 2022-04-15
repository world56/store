/**
 * @name ENUM_COMMON 枚举-通用枚举
 */
export namespace ENUM_COMMON {
  /**
   * @name COMPONENT_TYPE Search支持的组件类型
   * @param INPUT 文本输入框
   * @param SELECT 下拉选择框
   * @param CASCADER 级联多级选择器
   * @param TREE_SELECT 级联单选
   * @param TIME_SCOPE 时间选择
   */
  export enum COMPONENT_TYPE {
    INPUT = "INPUT",
    SELECT = "SELECT",
    CASCADER = "CASCADER",
    TIME_SCOPE = "TIME_SCOPE",
    TREE_SELECT = "TREE_SELECT",
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

  /**
   * @name STATUS_COLOUR_NUMBER
   * @param DEFAULT 默认色号 #1890ff 浅蓝
   * @param SUCCESS 成功色号 #67c23a 浅绿
   * @param DANGER  危险色号 #f56c6c 浅红
   * @param WARNING 警告色号 #e6a23c 浅黄
   */
  export enum STATUS_COLOUR_NUMBER {
    DEFAULT = "#1890ff",
    SUCCESS = "#67c23a",
    DANGER = "#f56c6c",
    WARNING = "#e6a23c",
  }
}
