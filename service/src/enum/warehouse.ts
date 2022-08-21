/**
 * @name ENUM_WAREHOUSE 枚举-仓储模块
 */
export namespace ENUM_WAREHOUSE {
  /**
   * @name STATUS 仓位状态
   * @param ABNORMAL 异常
   * @param NORMAL 正常
   * @param FULL_LOAD 满载
   * @param STOCKTAKING 正在盘点
   */
  export enum STATUS {
    ABNORMAL,
    NORMAL,
    FULL_LOAD,
    STOCKTAKING,
  }

  /**
   * @name WAREHOUSING_TYPE 待入库类型
   * @param PURCHASE 采购入库
   * @param AFTER_SALES 售后入库
   */
  export enum WAREHOUSING_TYPE {
    PURCHASE,
    AFTER_SALES,
  }
  /**
   * @name WAREHOUSING_PROCESS 入库流程
   * @param GOODS_TO_BE_RECEIVED 待收货
   * @param WAITING_FOR_STORAGE 待入库
   * @param UNDER_REVIEW 待审核
   * @param WAITING_FOR_PAYMENT 待付款
   * @param COMPLETE 完成
   * @param ABANDONED 废弃
   */
  export enum WAREHOUSING_PROCESS {
    GOODS_TO_BE_RECEIVED,
    WAITING_FOR_STORAGE,
    UNDER_REVIEW,
    WAITING_FOR_PAYMENT,
    COMPLETE,
    ABANDONED,
  }
}
