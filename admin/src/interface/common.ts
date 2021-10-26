import { ENUM_HTTP } from "@/enum/http";

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
   * @name GenericObject 通用对象
   */
  export type GenericObject = Record<React.Key, React.Key>;

  /**
   * @name DefaultKey 统一约束定义的枚举键值对
   */
  export type DefaultKey<T = React.Key> = Record<"key" | "value", T>;

  /**
   * @name Gateway 网关
   * @param {number} code 请求状态CODE
   * @param {string} message 返回的消息
   * @param {boolean | void} 接口状态
   * @param {unknown | void} content 返回的业务数据
   */
  export interface Gateway<T> {
    content: T;
    message?: string;
    success: boolean;
    code: ENUM_HTTP.HTTP_CODE;
  }

  /**
   * @name TypePageTurning 翻页
   * @param {number} pageSize 每页条数
   * @param {number} currentPage 当前页码
   */
  export type PageTurning = Record<"currentPage" | "pageSize", number>;
}
