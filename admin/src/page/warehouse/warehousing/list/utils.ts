import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name editableBtn 是否可清点货物
 */
export function editableBtn(status?: ENUM_WAREHOUSE.WAREHOUSING_PROCESS) {
  return (
    status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.WAITING_FOR_STORAGE ||
    status === ENUM_WAREHOUSE.WAREHOUSING_PROCESS.UNDER_REVIEW
  );
}
