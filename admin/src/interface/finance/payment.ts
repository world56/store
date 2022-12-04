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
   * @param totalAmount 应付款总额
   * @param actualPayment 实际付款金额
   * @param pruchaseOrderId 采购单ID
   * @param pruchaseOrder 采购单DTO
   * @param vouchers 付款凭证
   * @param remark 备注
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "no" | "remark"> {
    type: ENUM_FINANCE.FINANCE_PAYABLES_TYPE;
    status: ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS;
    totalAmount: number;
    actualPayment: number;
    pruchaseOrderId: TypePurchaseOrder.DTO["id"];
    purchaseOrder: TypePurchaseOrder.DTO;
    vouchers: TypeCommon.File[];
  }

  /**
   * @name Query 查询应付款列表
   */
  export interface Query
    extends TypeCommon.PageTurning,
      Partial<Pick<DTO, "no" | "type" | "status">> {}
}
