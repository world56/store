import { ENUM_FINANCE } from "@/enum/finance";

import type { TypeCommon } from "../common";
import type { TypePurchaseOrder } from "../purchase/order";

/**
 * @name TypeFinancePayment 财务管理-应付款
 */
export namespace TypeFinancePayment {
  /**
   * @name DTO 财务应付DTO
   * @param no 流水号
   * @param type 付款类型
   * @param status 流程状态
   * @param totalAmount 付款额度
   * @param pruchaseOrderId 采购单ID
   * @param pruchaseOrder 采购单DTO
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "no"> {
    type: ENUM_FINANCE.FINANCE_PAYABLES_TYPE;
    status: ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS;
    totalAmount: number;
    pruchaseOrderId: TypePurchaseOrder.DTO["id"];
    purchaseOrder: TypePurchaseOrder.DTO;
  }

  /**
   * @name Query 查询应付款列表
   */
  export interface Query
    extends TypeCommon.PageTurning,
      Pick<DTO, "no" | "type" | "status"> {}
}
