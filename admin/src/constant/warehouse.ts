import { toCategorys } from "@/utils/format";

import { ENUM_COMMON } from "@/enum/common";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name CONSTANT_WAREHOUSE 常量-仓库管理
 */
export namespace CONSTANT_WAREHOUSE {
  /**
   * @name WAREHOUSE_STATUS 货位状态
   */
  export const WAREHOUSE_STATUS = toCategorys([
    {
      id: ENUM_WAREHOUSE.WAREHOUSE_STATUS.NORMAL,
      name: "正常",
      color: ENUM_COMMON.COLOR.GREEN,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSE_STATUS.FULL_LOAD,
      name: "满载",
      color: ENUM_COMMON.COLOR.RED,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSE_STATUS.STOCKTAKING,
      name: "正在盘点",
      color: ENUM_COMMON.COLOR.YELLOW,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSE_STATUS.ABNORMAL,
      name: "异常",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);

  /**
   * @name WAREHOUSING_TYPE 入库类型
   */
  export const WAREHOUSING_TYPE = toCategorys([
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE,
      name: "采购入库",
      color: ENUM_COMMON.COLOR.BLUE,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES,
      name: "售后入库",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);

  /**
   * @name WAREHOUSING_PROCESS_STATUS 入库流程状态
   */
  export const WAREHOUSING_PROCESS_STATUS = toCategorys([
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.GOODS_TO_BE_RECEIVED,
      name: "待收货",
      color: ENUM_COMMON.COLOR.GREY,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.WAITING_FOR_STORAGE,
      name: "待入库",
      color: ENUM_COMMON.COLOR.BLUE,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.UNDER_REVIEW,
      name: "待审核",
      color: ENUM_COMMON.COLOR.PURPLE,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.COMPLETE,
      name: "完成",
      color: ENUM_COMMON.COLOR.GREEN,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.ABANDONED,
      name: "废弃",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);

  /**
   * @name WAREHOUSING_AUDIT_STATUS 入库审核状态
   */
  export const WAREHOUSING_AUDIT_STATUS = toCategorys([
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.PENDING,
      name: "待审核",
      color: ENUM_COMMON.COLOR.YELLOW,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.RESOLVED,
      name: "通过",
      color: ENUM_COMMON.COLOR.GREEN,
    },
    {
      id: ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.REJECT,
      name: "拒绝",
      color: ENUM_COMMON.COLOR.RED,
    },
  ]);

  /**
   * @name WAREHOUSE_AUDIT_TYPE 仓储审核类型
   */
  export const WAREHOUSE_AUDIT_TYPE = toCategorys([
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.PURCHASE, name: "采购入库" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.AFTER_SALES, name: "售后入库" },
    { id: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.INVENTORY, name: "盘点" },
  ]);
}
