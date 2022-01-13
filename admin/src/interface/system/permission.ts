import type { TypeCommon } from "../common";

import { ENUM_COMMON } from "@/enum/common";
import { ENUM_SYSTEM } from "@/enum/system";

/**
 * @name TypeSystemPermission 系统管理-权限
 */
export namespace TypeSystemPermission {
  /**
   * @name Info 权限基本信息
   * @param name 中文名称
   * @param code 英文名称
   * @param location 所属位置
   * @param type 权限类型
   * @param status 激活状态
   * @param remark 备注
   */
  export interface Info extends Partial<TypeCommon.DatabaseMainParameter> {
    name: string;
    code: string;
    location: string[];
    type: ENUM_SYSTEM.PERMISSION_TYPE;
    status: ENUM_COMMON.STATUS;
    remark?: string;
  }

  /**
   * @name InfoTree 权限树列表
   */
  export interface InfoTree extends Info {
    children: InfoTree[];
  }

  /**
   * @name QueryList 获取-权限管理列表
   */
  export interface QueryList
    extends TypeCommon.PageTurning,
      TypeCommon.DatabaseMainParameter,
      Pick<Info, "name" | "code" | "status"> {}

  /**
   * @name QueryTreeList 获取-权限树列表
   * @param tree true:返回树 false|void 返回平铺列表
   */
  export interface QueryTreeList {
    tree?: boolean;
  };

  /**
   * @name Remove 删除权限
   */
  export interface Remove extends TypeCommon.DatabaseMainParameter {}

  /**
   * @name CheckFields 检查字段是否重复
   */
  export interface CheckFields
    extends Partial<Pick<Info, "_id" | "name" | "code">> {}
}
