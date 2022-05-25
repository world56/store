import { ENUM_STORE } from "@/enum/store";

export const CATEGORY_NAME = {
  [ENUM_STORE.CATEGORY.WAREHOUSE_UNIT]: "计量单位",
  [ENUM_STORE.CATEGORY.WAREHOUSE_PRODUCT_TYPE]: "仓库产品",
  [ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE]: "供应商产品",
};

/**
 * @name getCategoryName 获取类目名称
 */
export function getCategoryName(type: ENUM_STORE.CATEGORY) {
  return CATEGORY_NAME[type as keyof typeof CATEGORY_NAME];
}
