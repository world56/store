import { ENUM_SYSTEM } from "@/enum/system";

/**
 * @name CONSTANT_SYSTEM 常量-系统管理模块
 */
export namespace CONSTANT_SYSTEM {
  /**
   * @name KEY_VALUE_PERMISSION_TYPE 权限类型
   */
  export const KEY_VALUE_PERMISSION_TYPE = Object.freeze(<const>{
    [ENUM_SYSTEM.PERMISSION_TYPE.PAGE]: "页面",
    [ENUM_SYSTEM.PERMISSION_TYPE.BUTTON]: "按钮",
    [ENUM_SYSTEM.PERMISSION_TYPE.CONTENT]: "内容",
  });

  /**
   * @name LIST_PERMISSION_TYPE 角色状态
   */
  export const LIST_PERMISSION_TYPE = Object.freeze(<const>[
    { key: ENUM_SYSTEM.PERMISSION_TYPE.PAGE, value: "页面" },
    { key: ENUM_SYSTEM.PERMISSION_TYPE.BUTTON, value: "按钮" },
    { key: ENUM_SYSTEM.PERMISSION_TYPE.CONTENT, value: "内容" },
  ]);
}