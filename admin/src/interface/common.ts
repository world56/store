import { ENUM_HTTP } from "@/enum/http";
import React from "react";

/**
 * @name TypeCommon 公共接口
 */
export namespace TypeCommon {
  /**
   * @name DatabaseMainParameter 数据库主要参数
   * @param _id 主键
   */
  export interface DatabaseMainParameter {
    readonly _id: string;
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
   * @name QueryDefaulsParam 搜索组件公共参数
   */
  export interface QueryDefaulsParam {
    time?: number[];
  }

  /**
   * @name PromiseReturns Promise reject
   */
  export type PromiseReturns<T> = T extends Promise<infer R> ? R : never;

  /**
   * @name Gateway 网关
   * @param {number} code 请求状态CODE
   * @param {string} message 返回的消息
   * @param {boolean | void} 接口状态
   * @param {unknown | void} content as T 返回的业务数据
   */
  export interface Gateway<T> {
    content: T;
    readonly message?: string;
    readonly success: boolean;
    readonly code: ENUM_HTTP.HTTP_CODE;
  }

  /**
   * @name ServiceReturn 返回的标准List
   */
  export interface ServiceReturn<T> extends PageTurning {
    list: T[];
    total: number;
  }

  /**
   * @name PageTurning 翻页
   * @param {number} pageSize 每页条数
   * @param {number} currentPage 当前页码
   */
  export type PageTurning = Record<"currentPage" | "pageSize", number>;

  /**
   * @name StandardTreeField Tree标准数据结构
   * @param key 对应的ID
   * @param value 对应的name
   * @param children 子集
   */
  export interface StandardTreeField
    extends Record<"key" | "value", React.Key> {
    children: StandardTreeField[];
  }
}
