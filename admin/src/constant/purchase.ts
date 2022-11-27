import { toCategorys } from "@/utils/format";

import { ENUM_COMMON } from "@/enum/common";
import { ENUM_PURCHASE } from "@/enum/purchase";

/**
 * @name CONSTANT_PURCHASE 常量-供应商管理
 */
export namespace CONSTANT_PURCHASE {
  /**
   * @name SUPPLIER_LOG_TYPE 供应商日志类型
   */
  export const SUPPLIER_LOG_TYPE = toCategorys([
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.QUALITY,
      name: "质量",
      color: ENUM_COMMON.COLOR.RED,
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PRICE,
      name: "价格",
      color: ENUM_COMMON.COLOR.YELLOW,
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.PUNCTUALITY,
      name: "准时性",
      color: ENUM_COMMON.COLOR.ORANGE,
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.AFTER_SALES,
      name: "售后服务",
      color: ENUM_COMMON.COLOR.PURPLE,
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.STATUS,
      name: "状态变更",
      color: ENUM_COMMON.COLOR.RED,
    },
    {
      id: ENUM_PURCHASE.SUPPLIER_LOG_TYPE.OTHER,
      name: "其他",
    },
  ]);

  /**
   * @name PURCHASE_SHIPPING_METHOD 采购单发货方式
   */
  export const PURCHASE_SHIPPING_METHOD = toCategorys([
    {
      id: ENUM_PURCHASE.PURCHASE_SHIPPING_METHOD.LOGISTICS,
      name: "物流（快递）",
    },
    {
      id: ENUM_PURCHASE.PURCHASE_SHIPPING_METHOD.NOT_LOGISTICS,
      name: "非物流",
    },
  ]);

  /**
   * @name PURCHASE_SETTLEMENT_METHOD 采购单结算方式
   */
  export const PURCHASE_SETTLEMENT_METHOD = toCategorys([
    {
      id: ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY,
      name: "货到付款",
      color: ENUM_COMMON.COLOR.BLACK,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.DELIVERY_AFTER_PAYMENT,
      name: "先付款后发货",
      color: ENUM_COMMON.COLOR.YELLOW,
    },
  ]);

  /**
   * @name PURCHASE_PROCESS_STATUS 采购流程单状态
   */
  export const PURCHASE_PROCESS_STATUS = toCategorys([
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED,
      name: "待收货",
      color: ENUM_COMMON.COLOR.GREY,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE,
      name: "待入库",
      color: ENUM_COMMON.COLOR.BLUE,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.UNDER_REVIEW,
      name: "待审核",
      color: ENUM_COMMON.COLOR.PURPLE,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT,
      name: "待付款",
      color: ENUM_COMMON.COLOR.ORANGE,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.COMPLETE,
      name: "完成",
      color: ENUM_COMMON.COLOR.GREEN,
    },
    {
      id: ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.ABANDONED,
      name: "废弃",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);
}
