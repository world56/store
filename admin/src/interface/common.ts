import { ENUM_STORE } from "@/enum/store";
import { ENUM_COMMON } from "@/enum/common";

import type store from "@/store";
import type { TypeAdminUser } from "./system/user";

/**
 * @name TypeCommon 公共接口
 */
export namespace TypeCommon {
  /**
   * @name PrimaryKey DB主键类型
   */
  export type PrimaryKey = number;

  /**
   * @name DatabaseMainParameter 数据库主要参数
   * @param id 主键
   */
  export interface DatabaseMainParameter<T = PrimaryKey> {
    readonly id: T;
  }

  /**
   * @name ChangeStatus 修改状态
   */
  export interface ChangeStatus extends Pick<DTO, "id" | "status" | "remark"> {}

  /**
   * @name GenericObject 通用对象
   */
  export type GenericObject<T = React.Key> = Record<React.Key, T>;

  /**
   * @name ConstantVal 取Object Value
   */
  export type ConstantVal<T> = T[keyof T];

  /**
   * @name DefaultKey 统一约束定义的枚举键值对
   */
  export interface DefaultKey extends DatabaseMainParameter {
    name: string;
  }

  /**
   * @name DTO 公共DTO常用字段
   * @param id 主键
   * @param no 流水号
   * @param name 名称
   * @param status 状态
   * @param remark 备注
   * @param parentId 父id
   * @param category 所属类目
   * @param createTime 初始化时间
   */
  export interface DTO extends DatabaseMainParameter {
    no: string;
    remark?: string;
    name: string;
    parentId: number;
    createTime: string;
    category: Category[];
    status: ENUM_COMMON.STATUS;
  }

  /**
   * @name FieldsIsRepeatDTO 校验字段是否重复
   */
  export interface FieldsIsRepeatDTO extends Pick<DTO, "id" | "name"> {}

  /**
   * @name Store Redux 状态机
   */
  export type Store = ReturnType<typeof store.getState>;

  /**
   * @name Category 类目
   */
  export interface Category extends Pick<DTO, "id" | "name" | "remark"> {
    type: ENUM_STORE.CATEGORY;
    color?: string;
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
    user?: Pick<TypeAdminUser.DTO, "id" | "name">;
  }
}
