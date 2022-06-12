import { ENUM_PURCHASE } from "@/enum/purchase";

/**
 * @name CONSTANT_PURCHASE 常量-供应商管理
 */
export namespace CONSTANT_PURCHASE {
  /**
   * @name SUPPLIER_LOG_TYPE 供应商日志类型
   */
  export const SUPPLIER_LOG_TYPE = {
    OBJ: {
      [ENUM_PURCHASE.LOG_TYPE.QUALITY]: "质量",
      [ENUM_PURCHASE.LOG_TYPE.PRICE]: "价格",
      [ENUM_PURCHASE.LOG_TYPE.PUNCTUALITY]: "准时性",
      [ENUM_PURCHASE.LOG_TYPE.AFTER_SALES]: "售后服务",
      [ENUM_PURCHASE.LOG_TYPE.STATUS]: "状态变更",
      [ENUM_PURCHASE.LOG_TYPE.OTHER]: "其他",
    },
    LIST: [
      { id: ENUM_PURCHASE.LOG_TYPE.QUALITY, name: "质量" },
      { id: ENUM_PURCHASE.LOG_TYPE.PRICE, name: "价格" },
      { id: ENUM_PURCHASE.LOG_TYPE.PUNCTUALITY, name: "准时性" },
      { id: ENUM_PURCHASE.LOG_TYPE.AFTER_SALES, name: "售后服务" },
      { id: ENUM_PURCHASE.LOG_TYPE.STATUS, name: "状态变更" },
      { id: ENUM_PURCHASE.LOG_TYPE.OTHER, name: "其他" },
    ],
  };
}
