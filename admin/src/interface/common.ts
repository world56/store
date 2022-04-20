import React from "react";

import { ENUM_HTTP } from "@/enum/http";
import { ENUM_COMMON } from "@/enum/common";

/**
 * @name TypeCommon 公共接口
 */
export namespace TypeCommon {
  /**
   * @name DatabaseMainParameter 数据库主要参数
   * @param id 主键
   */
  export interface DatabaseMainParameter<T = number> {
    readonly id: T;
  }

  /**
   * @name GenericObject 通用对象
   */
  export type GenericObject<T = React.Key> = Record<React.Key, T>;

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
   * @name DTO 公共DTO常用字段
   * @param id 主键
   * @param name 名称
   * @param status 状态
   * @param remark 备注
   */
  export interface DTO extends DatabaseMainParameter {
    status: ENUM_COMMON.STATUS;
    remark?: string;
    name: string;
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
   * @param count 总数
   */
  export interface ServiceReturn<T> extends PageTurning {
    list: T[];
    readonly count: number;
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
