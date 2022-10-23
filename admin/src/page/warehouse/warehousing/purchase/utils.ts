import { isVoid } from "@/utils";

import type React from "react";
import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

export interface EditWarehousingProductDetails
  extends Omit<TypePurchaseOrder.EditDTO["products"][0], "spec"> {
  specName: React.Key;
}

/**
 * @name serviceToForm 采购产品验收结构
 */
export function serviceToForm(data: TypeWarehouseWarehousing.DTO) {
  const { order, remark, id } = data;
  const products: EditWarehousingProductDetails[] = [];
  for (const val of order.products) {
    products.push({
      id: val.id,
      name: val.product.name,
      productId: val.product.id,
      brand: val.product.brand.name,
      unit: val.product.unit.name,
      surplus: 1000, // 剩余库存 Mock
      remark: val.remark,
      quantity: val.quantity,
      specName: val?.spec?.name,
      actualQuantity: isVoid(val.actualQuantity)
        ? val.quantity
        : val.actualQuantity,
    });
  }
  return { id, products, remark };
}

/**
 * @name editableBtn 是否可确认入库清单
 */
export function editableBtn(status?: ENUM_WAREHOUSE.WAREHOUSING_PROCESS) {
  return status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE;
}
