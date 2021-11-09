import type { Model, Document } from 'mongoose';

/**
 * @name TypeCommon 公共接口
 */
export namespace TypeCommon {
  /**
   * @name TypeMongoose DB scheam
   */
  export type TypeMongoose<T> = Model<T & Document>;

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

  /**
   * @name TypePageTurning 翻页
   * @param {number} pageSize 每页条数
   * @param {number} currentPage 当前页码
   */
  export type PageTurning = Record<'currentPage' | 'pageSize', number>;
}
