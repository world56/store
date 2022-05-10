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
}
