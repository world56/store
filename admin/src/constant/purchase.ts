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
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.QUALITY]: "质量",
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PRICE]: "价格",
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PUNCTUALITY]: "准时性",
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.AFTER_SALES]: "售后服务",
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS]: "状态变更",
      [ENUM_PURCHASE.SUPPLIER_LOG_TYPE.OTHER]: "其他",
    },
    LIST: [
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.QUALITY, name: "质量" },
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PRICE, name: "价格" },
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PUNCTUALITY, name: "准时性" },
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.AFTER_SALES, name: "售后服务" },
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS, name: "状态变更" },
      { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.OTHER, name: "其他" },
    ],
  };

  /**
   * @name SUPPLIER_SHIPPING_METHOD 供应商发货方式
   */
  export const SUPPLIER_SHIPPING_METHOD = {
    OBJ: {
      [ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.LOGISTICS]: "物流",
      [ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.NOT_LOGISTICS]: "非物流",
    },
    LIST: [
      { id: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.LOGISTICS, name: "物流" },
      {
        id: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.NOT_LOGISTICS,
        name: "非物流",
      },
    ],
  };

  /**
   * @name SUPPLIER_SETTLEMENT 供应商结算方式
   */
  export const SUPPLIER_SETTLEMENT = {
    OBJ: {
      [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY]: "货到付款",
      [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT]:
        "先付款后发货",
    },
    LIST: [
      {
        id: ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY,
        name: "货到付款",
      },
      {
        id: ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT,
        name: "先付款后发货",
      },
    ],
  };

  /**
   * @name SUPPLIER_ORDER_STATUS 供应商订单采购状态
   */
  export const SUPPLIER_ORDER_STATUS = {
    OBJ: {
      [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_WAREHOUSED]: "待入库",
      [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_PAID]: "待付款",
      [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.COMPLETE]: "完成",
    },
    LIST: [
      {
        id: ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_WAREHOUSED,
        name: "待入库",
      },
      { id: ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_PAID, name: "待付款" },
      { id: ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.COMPLETE, name: "完成" },
    ],
  };
}
