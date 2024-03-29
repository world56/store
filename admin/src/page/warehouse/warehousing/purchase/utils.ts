import { isVoid } from "@/utils";

import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";

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
      quantity: val.quantity,
      specName: val?.spec?.name,
      actualQuantity: isVoid(val.actualQuantity)
        ? val.quantity
        : val.actualQuantity,
    });
  }
  return { id, products, remark };
}
