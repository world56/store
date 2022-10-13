import { toCategorys } from "@/utils/format";

import { ENUM_PURCHASE } from "@/enum/purchase";

/**
 * @name CONSTANT_PURCHASE 常量-供应商管理
 */
export namespace CONSTANT_PURCHASE {
  /**
   * @name SUPPLIER_LOG_TYPE 供应商日志类型
   */
  export const SUPPLIER_LOG_TYPE = toCategorys([
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.QUALITY, name: "质量" },
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PRICE, name: "价格" },
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PUNCTUALITY, name: "准时性" },
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.AFTER_SALES, name: "售后服务" },
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS, name: "状态变更" },
    { id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.OTHER, name: "其他" },
  ]);

  /**
   * @name SUPPLIER_SHIPPING_METHOD 供应商发货方式
   */
  export const SUPPLIER_SHIPPING_METHOD = toCategorys([
    { id: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.LOGISTICS, name: "物流" },
    {
      id: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.NOT_LOGISTICS,
      name: "非物流",
    },
  ]);

  /**
   * @name SUPPLIER_SETTLEMENT 供应商结算方式
   */
  export const SUPPLIER_SETTLEMENT = toCategorys([
    {
      id: ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY,
      name: "货到付款",
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT,
      name: "先付款后发货",
    },
  ]);
}
