import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name CONSTANT_WAREHOURE 常量-仓库管理
 */
export namespace CONSTANT_WAREHOURE {
  /**
   * @name WAREHOURE_STATUS 货位状态
   */
  export const WAREHOURE_STATUS = {
    OBJ: {
      [ENUM_WAREHOUSE.STATUS.ABNORMAL]: "异常",
      [ENUM_WAREHOUSE.STATUS.NORMAL]: "正常",
      [ENUM_WAREHOUSE.STATUS.FULL_LOAD]: "满载",
      [ENUM_WAREHOUSE.STATUS.STOCKTAKING]: "正在盘点",
    },
    LIST: [
      { id: ENUM_WAREHOUSE.STATUS.NORMAL, name: "正常" },
      { id: ENUM_WAREHOUSE.STATUS.FULL_LOAD, name: "满载" },
      { id: ENUM_WAREHOUSE.STATUS.STOCKTAKING, name: "正在盘点" },
      { id: ENUM_WAREHOUSE.STATUS.ABNORMAL, name: "异常" },
    ],
  };

  /**
   * @name WAREHOUSING_TYPE 入库类型
   */
  export const WAREHOUSING_TYPE = {
    OBJ: {
      [ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE]: "采购入库",
      [ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES]: "售后入库",
    },
    LIST:[
      { id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.PURCHASE, name: "采购入库" },
      { id: ENUM_WAREHOUSE.WAREHOUSING_TYPE.AFTER_SALES, name: "售后入库" },
    ]
  };
}
