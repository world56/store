import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypePurchaseOrder } from "@/interface/purchase/order";

// const CASH_ON_DELIVERY = [
//   ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
//   ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
// ];

// const DELIVERY_AFTER_PAYMENT = [
//   ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_PAYMENT, // 待付款
//   ENUM_WAREHOUSE.WAREHOUSING_PROCESS.GOODS_TO_BE_RECEIVED, // 待收货
//   ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE, // 待入库
// ];

// /**
//  * @name showEditBtn 显示编辑按钮
//  */
// export function showEditBtn(row: TypePurchaseOrder.DTO) {
//   if (row.settlement === ENUM_PURCHASE.SUPPLIER_SETTLEMENT.CASH_ON_DELIVERY) {
//     return CASH_ON_DELIVERY.includes(row.warehousing.status);
//   } else {
//     return DELIVERY_AFTER_PAYMENT.includes(row.warehousing.status);
//   }
// }

/**
 * @name showAbandoned 显示废弃按钮
 * @desc 只有在仓储部门 确认收货前，才能进行作废操作
 *       先付款在发货 在付款前可以废弃（财务付款后就不能废弃了）
 *       先发货在付款 收到货前可以废弃 （仓储部门确认收货后肯定不能废弃）
 */
export function showAbandoned(row: TypePurchaseOrder.DTO) {
  const cashOnDelivery =
    row.settlement ===
      ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.CASH_ON_DELIVERY &&
    row.status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.GOODS_TO_BE_RECEIVED;
  const deliveryAfterPayment =
    row.settlement ===
      ENUM_PURCHASE.PURCHASE_SETTLEMENT_METHOD.DELIVERY_AFTER_PAYMENT &&
    row.status === ENUM_PURCHASE.PURCHASE_PROCESS_STATUS.WAITING_FOR_PAYMENT;
  return cashOnDelivery || deliveryAfterPayment;
}
