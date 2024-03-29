import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypePurchaseOrder } from "@/interface/purchase/order";

const CASH_ON_DELIVERY = [
  ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE, // 待入库
  ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED, // 待收货
];

const DELIVERY_AFTER_PAYMENT = [
  ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT, // 待付款
  ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED, // 待收货
  ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE, // 待入库
];

/**
 * @name editPurchaseOrder 采购单待入库
 * @description 采购订单是否未入库
 */
export function purchaseWaitWarehoused(row?: TypePurchaseOrder.DTO) {
  if (row?.status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.ABANDONED) {
    return true;
  } else if (
    row?.settlement ===
    ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY
  ) {
    return CASH_ON_DELIVERY.includes(row.status);
  } else {
    return DELIVERY_AFTER_PAYMENT.includes(row?.status!);
  }
}

/**
 * @name editPurchaseOrder 采购订单是否可编辑
 */
export function editPurchaseOrder(data?: TypePurchaseOrder.DTO) {
  if (data) {
    const { status, settlement } = data;
    if (
      settlement === ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY
    ) {
      return !(
        status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED ||
        status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_STORAGE
      );
    } else if (
      settlement ===
      ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.DELIVERY_AFTER_PAYMENT
    ) {
      return !(
        status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT
      );
    } else {
      return true;
    }
  }
}
