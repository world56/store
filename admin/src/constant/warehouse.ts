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
      { key: ENUM_WAREHOUSE.STATUS.NORMAL, value: "正常" },
      { key: ENUM_WAREHOUSE.STATUS.FULL_LOAD, value: "满载" },
      { key: ENUM_WAREHOUSE.STATUS.STOCKTAKING, value: "正在盘点" },
      { key: ENUM_WAREHOUSE.STATUS.ABNORMAL, value: "异常" },
    ],
  };
}
