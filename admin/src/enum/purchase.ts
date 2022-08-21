/**
 * @name ENUM_PURCHASE 枚举-供应商
 */
export namespace ENUM_PURCHASE {
  /**
   * @name SUPPLIER_LOG_TYPE 日志类型
   * @param STATUS 供应商状态变更
   * @param QUALITY 产品质量
   * @param PRICE 价格
   * @param PUNCTUALITY 准时性
   * @param AFTER_SALES 售后服务
   * @param OTHER 其他
   */
  export enum SUPPLIER_LOG_TYPE {
    STATUS,
    QUALITY,
    PRICE,
    PUNCTUALITY,
    AFTER_SALES,
    OTHER,
  }

  /**
   * @name SUPPLIER_SHIPPING_METHOD 采购订单运输方式
   * @param LOGISTICS 物流
   * @param NOT_LOGISTICS 非物流
   */
  export enum SUPPLIER_SHIPPING_METHOD {
    LOGISTICS,
    NOT_LOGISTICS,
  }

  /**
   * @name SUPPLIER_SETTLEMENT 采购订单结算方式
   * @param CASH_ON_DELIVERY 货到付款
   * @param DELIVERY_AFTER_PAYMENT 先付款后发货
   */
  export enum SUPPLIER_SETTLEMENT {
    CASH_ON_DELIVERY,
    DELIVERY_AFTER_PAYMENT,
  }

}
