import type React from "react";
import type store from "@/store";

import { ENUM_COMMON } from "@/enum/common";
import { ENUM_STORE } from "@/enum/store";

import type { TypeSystemUser } from "./system/user";

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
  export interface DefaultKey extends DatabaseMainParameter {
    name: string;
  }

  /**
   * @name DTO 公共DTO常用字段
   * @param id 主键
   * @param name 名称
   * @param status 状态
   * @param remark 备注
   * @param parentId 父id
   * @param category 所属类目
   * @param createTime 初始化时间
   */
  export interface DTO extends DatabaseMainParameter {
    status: ENUM_COMMON.STATUS;
    remark?: string;
    name: string;
    parentId: number;
    createTime: string;
    category: Category[];
  }

  /**
   * @name FieldsIsRepeatDTO 校验字段是否重复
   */
  export interface FieldsIsRepeatDTO extends Pick<DTO, "id" | "name"> {}

  /**
   * @name PromiseReturns Promise
   */
  export type PromiseReturns<T> = T extends Promise<infer R> ? R : never;

  /**
   * @name Dictionaries 字典
   */
  export interface Dictionaries {
    readonly OBJ: GenericObject;
    readonly LIST: Array<
      DefaultKey & Partial<Pick<DTO, "parentId" | "remark">>
    >;
  }

  /**
   * @name Store Redux 状态机
   */
  export type Store = ReturnType<typeof store.getState>;

  /**
   * @name Category 类目
   */
  export interface Category extends Pick<DTO, "id" | "name" | "remark"> {
    type: ENUM_STORE.CATEGORY;
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

  /**
   * @name File 服务器静态资源
   * @param name 名称
   * @param path 路径
   * @param type 类型
   * @param createTime 上传时间
   * @param userId 上传人ID
   * @param status 文件状态 （客户端使用）
   */
  export interface File {
    id: number;
    name: string;
    path: string;
    userId?: string;
    createTime?: string;
    type: ENUM_COMMON.FILE_TYPE;
    status?: ENUM_COMMON.UPLOAD_STATUS;
    user?: Pick<TypeSystemUser.DTO, "id" | "name">;
  }
}
