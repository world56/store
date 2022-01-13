import { DB_PRIMARY_KEY } from "@/config/db";

/**
 * @name CONFIG_TIME_FORMAT 时间格式
 */
export namespace CONFIG_TIME_FORMAT {
  /**
   * @name STANDARD  系统内部标准时间格式
   * @description YYYY-MM-DD HH:mm:ss
   */
  export const STANDARD = "YYYY-MM-DD HH:mm:ss";
}

/**
 * @name CONFIG_ANTD_COMP Antd UI 组件配置
 */
export namespace CONFIG_ANTD_COMP {
  /** @name TREE_FIELD_PERMISSION Tree组件 权限树字段指定 */
  export const TREE_FIELD_PERMISSION = {
    key: DB_PRIMARY_KEY,
    title: "name",
    children: "children",
  };

  /** @name CASCADER_FIELD_PERMISSION Cascader 权限树字段指定 */
  export const CASCADER_FIELD_PERMISSION = {
    value: DB_PRIMARY_KEY,
    label: "name",
    children: "children",
  };
}
