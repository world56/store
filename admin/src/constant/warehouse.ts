import { toCategorys } from "@/utils/format";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name CONSTANT_WAREHOUSE 常量-仓库管理
 */
export namespace CONSTANT_WAREHOUSE {
  /**
   * @name WAREHOUSE_STATUS 货位状态
   */
  export const WAREHOUSE_STATUS = toCategorys([
    { id: ENUM_WAREHOUSE.STATUS.NORMAL, name: "正常" },
    { id: ENUM_WAREHOUSE.STATUS.FULL_LOAD, name: "满载" },
    { id: ENUM_WAREHOUSE.STATUS.STOCKTAKING, name: "正在盘点" },
    { id: ENUM_WAREHOUSE.STATUS.ABNORMAL, name: "异常" },
  ]);

  /**
   * @name WAREHOUSING_TYPE 入库类型
   */
  export const WAREHOUSING_TYPE = toCategorys([
    { id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE, name: "采购入库" },
    { id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES, name: "售后入库" },
  ]);

  /**
   * @name WAREHOUSING_PROCESS 入库流程状态
   */
  export const WAREHOUSING_PROCESS = toCategorys([
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED,
      name: "待收货",
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE,
      name: "待入库",
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.UNDER_REVIEW,
      name: "待审核",
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT,
      name: "待付款",
    },
    { id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.COMPLETE, name: "完成" },
    { id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS.ABANDONED, name: "废弃" },
  ]);

  /**
   * @name WAREHOUSE_AUDIT_STATUS 审核状态
   */
  export const WAREHOUSE_AUDIT_STATUS = toCategorys([
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_STATUS.PENDING, name: "待审核" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_STATUS.RESOLVED, name: "拒绝" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_STATUS.REJECT, name: "待审核" },
  ]);

  /**
   * @name WAREHOUSE_AUDIT_TYPE 仓储审核类型
   */
  export const WAREHOUSE_AUDIT_TYPE = toCategorys([
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.STOCK_IN, name: "入库" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.STOCK_OUT, name: "出库" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.INVENTORY, name: "盘点" },
  ]);
}
