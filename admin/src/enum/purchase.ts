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
   * @name PURCHASE_SHIPPING_METHOD 采购订单运输方式
   * @param LOGISTICS 物流
   * @param NOT_LOGISTICS 非物流
   */
  export enum PURCHASE_SHIPPING_METHOD {
    LOGISTICS,
    NOT_LOGISTICS,
  }

  /**
   * @name PURCHASE_PROCESS_STATUS 供应商采购流程状态
   * @param GOODS_TO_BE_RECEIVED 待收货
   * @param WAITING_FOR_STORAGE 待入库
   * @param UNDER_REVIEW 待审核
   * @param WAITING_FOR_PAYMENT 待付款
   * @param COMPLETE 完成
   * @param ABANDONED 废弃
   */
  export enum PURCHASE_PROCESS_STATUS {
    GOODS_TO_BE_RECEIVED,
    WAITING_FOR_STORAGE,
    UNDER_REVIEW,
    WAITING_FOR_PAYMENT,
    COMPLETE,
    ABANDONED,
  }

  /**
   * @name PURCHASE_SETTLEMENT_METHOD 采购订单结算方式
   * @param CASH_ON_DELIVERY 货到付款
   * @param DELIVERY_AFTER_PAYMENT 先付款后发货
   */
  export enum PURCHASE_SETTLEMENT_METHOD {
    CASH_ON_DELIVERY,
    DELIVERY_AFTER_PAYMENT,
  }
}
