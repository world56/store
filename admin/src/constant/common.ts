import { ENUM_COMMON } from "@/enum/common";

/**
 * @name CONSTANT_COMMON 常量-公共
 */
export namespace CONSTANT_COMMON {
  /**
   * @param STATUS 状态
   */
  export const STATUS = {
    OBJ: {
      [ENUM_COMMON.STATUS.ACTIVATE]: "激活",
      [ENUM_COMMON.STATUS.FREEZE]: "冻结",
    },
    LIST: [
      { key: ENUM_COMMON.STATUS.ACTIVATE, value: "激活" },
      { key: ENUM_COMMON.STATUS.FREEZE, value: "冻结" },
    ],
  };
}
