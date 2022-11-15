import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name showConfirmReceipt 显示"确认收货"按钮
 */
export function showConfirmReceipt(
  status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS,
) {
  return (
    status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.GOODS_TO_BE_RECEIVED
  );
}

/**
 * @name showCountTheGoods 显示“清点入库”按钮（保存清点入库信息）
 */
export function showCountTheGoods(
  status?: ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS,
) {
  return (
    status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS_STATUS.WAITING_FOR_STORAGE
  );
}
