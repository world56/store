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
      color: ENUM_COMMON.COLOR.RED,
      text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.FREEZE],
    },
    [ENUM_COMMON.STATUS.ACTIVATE]: {
      color: ENUM_COMMON.COLOR.GREEN,
      text: CONSTANT_COMMON.STATUS.OBJ[ENUM_COMMON.STATUS.ACTIVATE],
    },
  };

  /**
   * @name WAREHOURE_STATUS 仓储-仓位状态
   */
  export const WAREHOURE_STATUS = {
    // 异常
    [ENUM_WAREHOUSE.STATUS.ABNORMAL]: {
      color: ENUM_COMMON.COLOR.RED,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.ABNORMAL
      ],
    },
    // 正常
    [ENUM_WAREHOUSE.STATUS.NORMAL]: {
      color: ENUM_COMMON.COLOR.GREEN,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.NORMAL
      ],
    },
    // 满载
    [ENUM_WAREHOUSE.STATUS.FULL_LOAD]: {
      color: ENUM_COMMON.COLOR.RED,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.FULL_LOAD
      ],
    },
    // 正在盘点
    [ENUM_WAREHOUSE.STATUS.STOCKTAKING]: {
      color: ENUM_COMMON.COLOR.YELLOW,
      text: CONSTANT_WAREHOURE.WAREHOURE_STATUS.OBJ[
        ENUM_WAREHOUSE.STATUS.STOCKTAKING
      ],
    },
  };

  /**
   * @name PURCHASE_ORDER_SETTLEMENT 采购订单-结算方式
   */
  export const PURCHASE_ORDER_SETTLEMENT = {
    // 货到付款
    [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY]: {
      color: ENUM_COMMON.COLOR.BLACK,
      text: CONSTANT_PURCHASE.SUPPLIER_SETTLEMENT.OBJ[
        ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY
      ],
    },
    // 先付款后发货
    [ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT]: {
      color: ENUM_COMMON.COLOR.YELLOW,
      text: CONSTANT_PURCHASE.SUPPLIER_SETTLEMENT.OBJ[
        ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT
      ],
    },
  };

  /**
   * @name WAREHOUSING_TYPE 入库类型
   */
  export const WAREHOUSING_TYPE = {
    // 售后入库
    [ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES]: {
      color: ENUM_COMMON.COLOR.RED,
      text: CONSTANT_WAREHOURE.WAREHOUSING_TYPE.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES
      ],
    },
    // 采购入库
    [ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE]: {
      color: ENUM_COMMON.COLOR.BLUE,
      text: CONSTANT_WAREHOURE.WAREHOUSING_TYPE.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE
      ],
    },
  };

  /**
   * @name WAREHOUSING_STATUS 入库状态
   */
  export const WAREHOUSING_STATUS = {
    // 待收货
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED]: {
      color: ENUM_COMMON.COLOR.GREY,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED
      ],
    },
    // 待入库
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE]: {
      color: ENUM_COMMON.COLOR.BLUE,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE
      ],
    },
    // 待审核
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.UNDER_REVIEW]: {
      color: ENUM_COMMON.COLOR.PURPLE,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.UNDER_REVIEW
      ],
    },
    // 待付款
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT]: {
      color: ENUM_COMMON.COLOR.ORANGE,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT
      ],
    },
    // 完成
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.COMPLETE]: {
      color: ENUM_COMMON.COLOR.GREEN,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.COMPLETE
      ],
    },
    // 完成
    [ENUM_WAREHOUSE.WAREHOUSING_PROCESS.ABANDONED]: {
      color: ENUM_COMMON.COLOR.RED,
      text: CONSTANT_WAREHOURE.WAREHOUSING_PROCESS.OBJ[
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.ABANDONED
      ],
    },
  };
}
