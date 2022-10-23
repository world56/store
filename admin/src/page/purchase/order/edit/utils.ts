import { ENUM_PURCHASE } from "@/enum/purchase";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";
import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeSupplierProduct } from "@/interface/purchase/product";

/**
 * @name filterDuplicatesProduct 过滤重复项产品
 */
export function filterDuplicatesProduct(
  adds: TypeSupplierProduct.DTO[],
  products: TypePurchaseOrder.EditDTO["products"] = [],
  supplierId: number,
) {
  for (const val of adds) {
    products.push({
      supplierId,
      productId: val.id,
      name: val.name,
      brand: val.brand.name,
      unit: val.unit.name,
      spec: val.spec,
      surplus: 1000, // 剩余库存
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
      spec: val.product.spec,
      specId: val.spec.id,
      surplus: 1000, // 剩余库存
      quantity: val.quantity,
      unitPrice: val.unitPrice / 100,
      remark: val.remark,
    });
  }
  return { ...data, products };
}

/**
 * @name formToServer 序列化产品顺序
 */
export function formToServer(form: TypePurchaseOrder.EditDTO) {
  return {
    ...form,
    products: form.products.sort((l, r) => l.productId! - r.productId!),
  };
}

/**
 * @name editParams 编辑价格、规格、采购数
 * @desc 货到付款 待收货、待入库可编辑
 *       先款后货 待付款可编辑
 */
export function editParams(data?: TypePurchaseOrder.DTO) {
  if (data) {
    const {
      settlement,
      warehousing: { status },
    } = data;
    if (settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY) {
      return !(
        status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED ||
        status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE
      );
    } else if (
      settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.DELIVERY_AFTER_PAYMENT
    ) {
      return !(
        status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT
      );
    } else {
      return true;
    }
  }
}
