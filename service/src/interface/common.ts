

/**
 * @name TypeCommon 公共接口
 */
 export namespace TypeCommon {
  /**
   * @name DatabaseMainParameter 数据库主要参数
   * @param _id 主键
   */
  export interface DatabaseMainParameter {
    _id: string;
  }

  /**
   * @name ConstantVal
   */
  export type ConstantVal<T> = T[keyof T];

}
