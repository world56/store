import type { FormListFieldData } from "antd/es/form/FormList";
import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeSupplierProduct } from "@/interface/purchase/product";

export function rowKey(record: FormListFieldData) {
  return record.name;
}

/**
 * @name filterDuplicatesProduct 过滤重复项产品
 */
export function filterDuplicatesProduct(
  adds: TypeSupplierProduct.DTO[],
  products: TypePurchaseOrder.EditDTO["products"],
) {
  for (const val of adds) {
    products.push({
      productId: val.id,
      name: val.name,
      brand: val.brand.name,
      unit: val.unit.name,
      spec: val.spec.map((v) => v.specParameter),
      surplus: 1000, // 剩余库存
      // quantity: 1, // 采购量
      // unitPrice: 10, // 单价
    });
  }
  return products;
}

export function serverToForm(data: TypePurchaseOrder.DTO) {
  const products: TypePurchaseOrder.EditDTO["products"] = [];
  for (const val of data.products) {
    products.push({
      id: val.id,
      productId: val.productId,
      name: val.product.name,
      brand: val.product.brand.name,
      unit: val.product.unit.name,
      spec: val.product.spec.map((v) => v.specParameter),
      specId: val.spec.id,
      surplus: 1000, // 剩余库存
      quantity: val.quantity,
      unitPrice: val.unitPrice / 100,
      remark: val.remark,
    });
  }
  return { ...data, products };
}
