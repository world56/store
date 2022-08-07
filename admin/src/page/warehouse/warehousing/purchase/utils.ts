import { isVoid } from "@/utils";

import type React from "react";
import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseOrder } from "@/interface/purchase/order";

export interface EditWarehousingProductDetails
  extends Omit<TypePurchaseOrder.EditDTO["products"][0], "spec"> {
  specName: React.Key;
}

/**
 * @name serviceToForm 采购产品验收结构
 */
export function serviceToForm(data: TypePurchaseOrder.DTO) {
  const products: EditWarehousingProductDetails[] = [];
  const dic: Record<number, TypeCommon.Dictionaries["OBJ"]> = {};
  for (const val of data.products) {
    if (!dic[val.productId]) {
      dic[val.productId] = Object.fromEntries(
        val.product.spec.map((v) => [v.specParameter.id, v.specParameter.name]),
      );
    }
    products.push({
      id: val.id,
      name: val.product.name,
      productId: val.product.id,
      brand: val.product.brand.name,
      unit: val.product.unit.name,
      surplus: 1000, // 剩余库存 Mock
      remark: val.remark,
      quantity: val.quantity,
      specName: dic[val.productId][val.spec.id],
      actualQuantity: isVoid(val.actualQuantity)
        ? val.quantity
        : val.actualQuantity,
    });
  }
  return { products };
}
