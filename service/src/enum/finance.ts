/**
 * @name ENUM_FINANCE 枚举-财务
 */
 export namespace ENUM_FINANCE {
  /**
   * @name FINANCE_PAYABLES_TYPE 财务应付款类型
   * @param PURCHASE 采购
   */
  export enum FINANCE_PAYABLES_TYPE {
    PURCHASE,
  }

  /**
   * @name FINANCIAL_PAYABLES_STATUS 财务应付款流程状态
   * @param WAITING 待付款
   * @param COMPLETE 已付款
   */
  export enum FINANCIAL_PAYABLES_STATUS {
    WAITING,
    COMPLETE,
  }
}
