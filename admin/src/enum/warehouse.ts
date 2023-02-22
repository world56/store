/**
 * @name ENUM_WAREHOUSE 枚举-仓储模块
 */
export namespace ENUM_WAREHOUSE {
  /**
   * @name WAREHOUSING_TYPE 入库类型
   * @param PURCHASE 采购入库
   * @param AFTER_SALES 售后入库
   */
  export enum WAREHOUSING_TYPE {
    PURCHASE,
    AFTER_SALES,
  }

  /**
   * @name WAREHOUSING_PROCESS_STATUS 仓储入库流程状态
   * @param GOODS_TO_BE_RECEIVED 待收货
   * @param WAITING_FOR_STORAGE 待入库
   * @param UNDER_REVIEW 待审核
   * @param COMPLETE 完成
   * @param ABANDONED 废弃
   * @description 对于仓储部门 只关心该步骤
   */
  export enum WAREHOUSING_PROCESS_STATUS {
    GOODS_TO_BE_RECEIVED,
    WAITING_FOR_STORAGE,
    UNDER_REVIEW,
    COMPLETE,
    ABANDONED,
  }

  /**
   * @name WAREHOUSING_AUDIT_STATUS 仓储入库审核状态
   * @param PENDING 待审核
   * @param RESOLVED 通过
   * @param REJECT 拒绝
   */
  export enum WAREHOUSING_AUDIT_STATUS {
    PENDING,
    RESOLVED,
    REJECT,
  }

  /**
   * @name WAREHOUSE_STATUS 仓位状态
   * @param ABNORMAL 异常
   * @param NORMAL 正常
   * @param FULL_LOAD 满载
   * @param STOCKTAKING 正在盘点
   */
  export enum WAREHOUSE_STATUS {
    ABNORMAL,
    NORMAL,
    FULL_LOAD,
    STOCKTAKING,
  }

  /**
   * @name WAREHOUSE_AUDIT_TYPE 仓储审核类型
   * @param PURCHASE 采购入库
   * @param AFTER_SALES 售后入库
   * @param INVENTORY 仓储盘点
   */
  export enum WAREHOUSE_AUDIT_TYPE {
    PURCHASE,
    AFTER_SALES,
    INVENTORY,
  }
}
