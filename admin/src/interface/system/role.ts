import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "../common";

/**
 * @name TypeSystemRole 系统管理-角色管理
 */
export namespace TypeSystemRole {
  /**
   * @name ReqList 请求-角色列表
   * @param name 角色名称
   * @param status 角色状态
   */
  export interface ReqRoleList
    extends TypeCommon.PageTurning,
      TypeCommon.DatabaseMainParameter {
    name?: string;
    status?: ENUM_COMMON.STATUS;
  }

  /**
   * @name EditRoleParam 编辑、新增角色
   * @param _id 角色ID
   * @param name 角色名称
   * @param status 状态
   * @param description 描述
   * @param createTime 创建时间
   */
  export interface EditRoleParam
    extends Record<"name" | "description", string>,
      Partial<TypeCommon.DatabaseMainParameter> {
    status: number;
    createTime: number;
  }
}
