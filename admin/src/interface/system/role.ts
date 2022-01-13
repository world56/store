import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "../common";
import type { TypeSystemPermission } from "./permission";

/**
 * @name TypeSystemRole 系统管理-角色管理
 */
export namespace TypeSystemRole {
  /**
   * @name QueryList 请求-角色列表
   * @param name 角色名称
   * @param status 角色状态
   */
  export interface QueryList
    extends TypeCommon.PageTurning,
      TypeCommon.DatabaseMainParameter {
    name?: string;
    status?: ENUM_COMMON.STATUS;
  }

  /**
   * @name Info 角色基本信息
   * @param _id 角色ID
   * @param name 角色名称
   * @param status 状态
   * @param permission 权限
   * @param description 描述
   * @param createTime 创建时间
   */
  export interface Info
    extends Record<"name" | "description", string>,
      Partial<TypeCommon.DatabaseMainParameter> {
    status: number;
    createTime: number;
    permission: string[] | TypeSystemPermission.Info[];
  }
}