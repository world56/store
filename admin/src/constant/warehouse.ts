import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name CONSTANT_WAREHOURE 常量-仓库管理
 */
export namespace CONSTANT_WAREHOURE {
  /**
   * @name K_V_IDENTIFICATION 货架位置标识
   */
  export const K_V_IDENTIFICATION = {
    [ENUM_WAREHOUSE.IDENTIFICATION_TYPE.REGION]: "区域",
    [ENUM_WAREHOUSE.IDENTIFICATION_TYPE.GOODS_SHELVES]: "货架",
    [ENUM_WAREHOUSE.IDENTIFICATION_TYPE.ARRANGEMENT]: "货层",
  };

  /**
   * @name LIST_IDENTIFICATION 货架位置标识
   */
  export const LIST_IDENTIFICATION = [
    { key: ENUM_WAREHOUSE.IDENTIFICATION_TYPE.REGION, value: "页面" },
    { key: ENUM_WAREHOUSE.IDENTIFICATION_TYPE.GOODS_SHELVES, value: "货架" },
    { key: ENUM_WAREHOUSE.IDENTIFICATION_TYPE.ARRANGEMENT, value: "货层" },
  ];
}
