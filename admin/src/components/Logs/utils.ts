import { ENUM_STORE } from "@/enum/store";
import { ENUM_COMMON } from "@/enum/common";

/**
 * @name CATEGORY_MODULE 日志模块对应的状态
 */
export const LOG_MODULE_TO_CATEGORY = {
  // 采购日志
  [ENUM_COMMON.LOG_MODULE.PURCHASE]:
    ENUM_STORE.CATEGORY_CONSTANT.PURCHASE_PROCESS_STATUS,
  // 供应商日志
  [ENUM_COMMON.LOG_MODULE.SUPPLIER]:
    ENUM_STORE.CATEGORY_CONSTANT.SUPPLIER_LOG_TYPE,
} as const;
