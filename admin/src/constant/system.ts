import { ENUM_ADMIN_SYSTEM } from "@/enum/system";

export namespace CONSTANT_SYSTEM {
  /**
   * @name ROLE_STATUS_KEY_VALUE 角色状态
   */
  export const KEY_VALUE_ROLE_STATUS = {
    [ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN]: "激活",
    [ENUM_ADMIN_SYSTEM.ROLE_STATUS.FREEZE]: "冻结",
  };

  /**
   * @name ROLE_STATUS_LIST 角色状态
   */
  export const LIST_ROLE_STATUS = [
    { key: ENUM_ADMIN_SYSTEM.ROLE_STATUS.OPEN, value: "激活" },
    { key: ENUM_ADMIN_SYSTEM.ROLE_STATUS.FREEZE, value: "冻结" },
  ];
}
