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
}
