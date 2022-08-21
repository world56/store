import { ENUM_PURCHASE } from "@/enum/purchase";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypePurchaseOrder } from "@/interface/purchase/order";

const CASH_ON_DELIVERY = [
  ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
  ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
];

const DELIVERY_AFTER_PAYMENT = [
  ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT, // 待付款
  ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
  ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
];

/**
 * @name showEditBtn 显示编辑按钮
 */
export function showEditBtn(row: TypePurchaseOrder.DTO) {
  if (row.settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY) {
    return CASH_ON_DELIVERY.includes(row.warehousing.status);
  } else {
    return DELIVERY_AFTER_PAYMENT.includes(row.warehousing.status);
  }
}

/**
 * @name showAbandoned 显示废弃按钮
 */
export function showAbandoned(row: TypePurchaseOrder.DTO) {
  if (row.settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY) {
    return (
      row.warehousing.status ===
      ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED
    );
  } else {
    return (
      row.warehousing.status ===
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED ||
      row.warehousing.status ===
        ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT
    );
  }
}
