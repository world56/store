import { ENUM_COMMON } from "@/enum/common";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";

/**
 * @name getWarehouseAuditLogModleKey 获取仓储审核日志模块类型
 * @param type 审核类型 入库、出库、审核
 * @description 仓储审核日志有多种类型
 */
export function getWarehouseAuditLogModleKey(
  type?: ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE,
) {
  switch (type) {
    case ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.PURCHASE:
      // 采购
      return ENUM_COMMON.LOG_MODULE.PURCHASE;
    // case ENUM_WAREHOUSE.WAREHOUSE_AUDIT_TYPE.AFTER_SALES:
    // 售后
    // return
    default:
      return undefined;
  }
}
