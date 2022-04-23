import { ENUM_SYSTEM } from "@/enum/system";

/**
 * @name CONSTANT_SYSTEM 常量-系统管理模块
 */
export namespace CONSTANT_SYSTEM {
  /**
   * @name K_V_PERMISSION 权限类型
   */
  export const K_V_PERMISSION = Object.freeze({
    [ENUM_SYSTEM.PERMISSION_TYPE.PAGE]: "页面",
    [ENUM_SYSTEM.PERMISSION_TYPE.BUTTON]: "按钮",
    [ENUM_SYSTEM.PERMISSION_TYPE.CONTENT]: "内容",
  } as const);

  /**
   * @name LIST_PERMISSION 角色状态
   */
  export const LIST_PERMISSION = Object.freeze([
    { key: ENUM_SYSTEM.PERMISSION_TYPE.PAGE, value: "页面" },
    { key: ENUM_SYSTEM.PERMISSION_TYPE.BUTTON, value: "按钮" },
    { key: ENUM_SYSTEM.PERMISSION_TYPE.CONTENT, value: "内容" },
  ] as const);
}
