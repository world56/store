import { ENUM_STORE } from "@/enum/store";

import type { TypeCategoryProps } from "./";

export const CATEGORY_NAME = {
  [ENUM_STORE.CATEGORY.PRODUCT_BRAND]: "品牌",
  [ENUM_STORE.CATEGORY.WAREHOUSE_UNIT]: "计量单位",
  [ENUM_STORE.CATEGORY.WAREHOUSE_PRODUCT_TYPE]: "仓库产品",
  [ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE]: "供应商产品",
  [ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY]: "物流公司",
  [ENUM_STORE.CATEGORY.BANK]: "资金账户",
};

/**
 * @name getCategoryName 获取类目名称
 */
export function getCategoryName(type: TypeCategoryProps["type"]) {
  return CATEGORY_NAME[type];
}
