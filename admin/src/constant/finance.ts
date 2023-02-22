import { toCategorys } from "@/utils/format";

import { ENUM_COMMON } from "@/enum/common";
import { ENUM_FINANCE } from "@/enum/finance";

/**
 * @name CONSTANT_FINANCE 常量-财务管理
 */
export namespace CONSTANT_FINANCE {
  /**
   * @name FINANCE_PAYABLES_TYPE 财务应付款类型
   */
  export const FINANCE_PAYABLES_TYPE = toCategorys([
    {
      id: ENUM_FINANCE.FINANCE_PAYABLES_TYPE.PURCHASE,
      name: "采购",
    },
  ]);

  /**
   * @name FINANCIAL_PAYABLES_STATUS 财务应付款流程状态
   */
  export const FINANCIAL_PAYABLES_STATUS = toCategorys([
    {
      id: ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS.WAITING,
      name: "待付款",
      color: ENUM_COMMON.COLOR.YELLOW,
    },
    {
      id: ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS.COMPLETE,
      name: "已付款",
      color: ENUM_COMMON.COLOR.GREEN,
    },
  ]);
}
