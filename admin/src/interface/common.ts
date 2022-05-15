import { ENUM_COMMON } from "@/enum/common";

import type React from "react";

/**
 * @name TypeCommon 公共接口
 */
export namespace TypeCommon {
  /**
   * @name GenericObject 通用对象
   */
  export type GenericObject<T = React.Key> = Record<React.Key, T>;

  /**
   * @name DefaultKey 统一约束定义的枚举键值对
   */
  export type DefaultKey<T = React.Key> = Record<"key" | "value", T>;

  /**
   * @name DatabaseMainParameter 数据库主要参数
   * @param id 主键
   */
  export interface DatabaseMainParameter<T = number> {
    readonly id: T;
  }

  /**
   * @name DTO 公共DTO常用字段
   * @param id 主键
   * @param name 名称
   * @param status 状态
   * @param remark 备注
   * @param parentId 父id
   */
  export interface DTO extends DatabaseMainParameter {
    status: ENUM_COMMON.STATUS;
    remark?: string;
    name: string;
    parentId: number;
  }

  /**
   * @name PromiseReturns Promise
   */
  export type PromiseReturns<T> = T extends Promise<infer R> ? R : never;

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

  /**
   * @name NetDisk 服务器静态资源
   * @param name 名称
   * @param path 路径
   * @param type 类型
   * @param userId 上传人ID
   * @param status 文件状态 （客户端使用）
   */
  export interface NetDisk {
    id: number;
    name: string;
    path: string;
    type: string;
    userId?: string;
    status?: ENUM_COMMON.UPLOAD_STATUS;
  }
}
