import { toCategorys } from "@/utils/format";

import { ENUM_SYSTEM } from "@/enum/system";

/**
 * @name CONSTANT_SYSTEM 常量-系统管理模块
 */
export namespace CONSTANT_SYSTEM {
  /**
   * @param PERMISSION_TYPE 权限类型
   */
  export const PERMISSION_TYPE = toCategorys([
    { id: ENUM_SYSTEM.PERMISSION_TYPE.PAGE, name: "页面" },
    { id: ENUM_SYSTEM.PERMISSION_TYPE.BUTTON, name: "按钮" },
    { id: ENUM_SYSTEM.PERMISSION_TYPE.CONTENT, name: "内容" },
  ]);
}
