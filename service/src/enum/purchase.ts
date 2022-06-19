/**
 * @name ENUM_PURCHASE 枚举-供应商
 */
export namespace ENUM_PURCHASE {
  /**
   * @name LOG_TYPE 日志类型
   * @param STATUS 供应商状态变更
   * @param QUALITY 产品质量
   * @param PRICE 价格
   * @param PUNCTUALITY 准时性
   * @param AFTER_SALES 售后服务
   * @param OTHER 其他
   */
  export enum LOG_TYPE {
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
   * @param CASH 现金结算
   * @param CYCLE 周期结算
   */
  export enum SUPPLIER_SETTLEMENT {
    CASH,
    CYCLE,
  }

  /**
   * @name SUPPLIER_ORDER_STATUS 采购订单状态
   * @param TO_BE_RECEIVED 待收货
   * @param TO_BE_WAREHOUSED 待入库
   * @param TO_BE_PAID 待付款 （走到这里，仓库的流程就算完成了）
   * @param COMPLETE 完成
   */
  export enum SUPPLIER_ORDER_STATUS {
    TO_BE_RECEIVED,
    TO_BE_WAREHOUSED,
    TO_BE_PAID,
    COMPLETE,
  }
}
