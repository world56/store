import { ENUM_COMMON } from "@/enum/common";
import { ENUM_PURCHASE } from "@/enum/purchase";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import { CONSTANT_COMMON } from "@/constant/common";
import { CONSTANT_PURCHASE } from "@/constant/purchase";
import { CONSTANT_WAREHOURE } from "@/constant/warehouse";

export namespace COLOR_TYPE {
  /**
   * @name DEFAULT_MATCHING 默认-激活、冻结
   */
  export const DEFAULT_MATCHING = {
    [ENUM_COMMON.STATUS.FREEZE]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.DANGER,
      text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.FREEZE],
    },
    [ENUM_COMMON.STATUS.ACTIVATE]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.SUCCESS,
      text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.ACTIVATE],
    },
  };

  /**
   * @name WAREHOURE_STATUS 仓储-仓位状态
   */
  export const WAREHOURE_STATUS = {
    // 异常
    [ENUM_WAREHOUSE.STATUS.ABNORMAL]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.DANGER,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.ABNORMAL
      ],
    },
    // 正常
    [ENUM_WAREHOUSE.STATUS.NORMAL]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.SUCCESS,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.NORMAL
      ],
    },
    // 满载
    [ENUM_WAREHOUSE.STATUS.FULL_LOAD]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.DANGER,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.FULL_LOAD
      ],
    },
    // 正在盘点
    [ENUM_WAREHOUSE.STATUS.STOCKTAKING]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.WARNING,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.STOCKTAKING
      ],
    },
  };

  /**
   * @name PURCHASE_ORDER 采购订单-订单状态
   */
  export const PURCHASE_ORDER = {
    // 待收货
    [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_RECEIVED]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.DEFAULT,
      text: CONSTANT_PURCHASE.SUPPLIER_ORDER_STATUS.OBJ[
        ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_RECEIVED
      ],
    },
    // 待入库
    [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_WAREHOUSED]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.WARNING,
      text: CONSTANT_PURCHASE.SUPPLIER_ORDER_STATUS.OBJ[
        ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_WAREHOUSED
      ],
    },
    // 待付款
    [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_PAID]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.WARNING,
      text: CONSTANT_PURCHASE.SUPPLIER_ORDER_STATUS.OBJ[
        ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.TO_BE_PAID
      ],
    },
    // 完成
    [ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.COMPLETE]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.SUCCESS,
      text: CONSTANT_PURCHASE.SUPPLIER_ORDER_STATUS.OBJ[
        ENUM_PURCHASE.SUPPLIER_ORDER_STATUS.COMPLETE
      ],
    },
  };

  /**
   * @name PURCHASE_ORDER_SETTLEMENT 采购订单-结算方式
   */
  export const PURCHASE_ORDER_SETTLEMENT = {
    // 货到付款
    [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY]: {
      text: CONSTANT_PURCHASE.SUPPLIER_SETTLEMENT.OBJ[
        ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY
      ],
    },
    // 先付款后发货
    [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT]: {
      color: ENUM_COMMON.STATUS_COLOR_TYPE.WARNING,
      text: CONSTANT_PURCHASE.SUPPLIER_SETTLEMENT.OBJ[
        ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT
      ],
    },
  };
}
