import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "../common";
import type { TypeSystemRole } from "./role";

/**
 * @name TypeSystemUser 系统管理-用户
 */
export namespace TypeSystemUser {
  /**
   * @name PubilcKey 用户模块-公匙
   */
  export type PubilcKey = string;

  /**
   * @name AccountSecret 用户模块-登录信息
   * @param account  账户
   * @param password 密码
   */
  export interface AccountSecret
    extends Record<"account" | "password", string> {}

  /**
   * @name RegisterUser 用户模块-注册信息
   * @param name  用户昵称
   * @param phone 联系手机号码
   */
  export interface RegisterUser
    extends AccountSecret,
      Record<"name" | "phone", string> {}

  /**
   * @name Info 用户模块-基本信息
   * @param _id     用户ID
   * @param token   用户token
   * @param isSuper 是否超管
   * @param rule    权限角色
   */
  export interface Info
    extends Omit<RegisterUser, "password">,
      TypeCommon.DatabaseMainParameter,
      Record<"token" | "isSuper", string> {
    status: ENUM_COMMON.STATUS;
    rule?: TypeSystemRole.Info[] | string[];
    remark?: string;
  }

  /**
   * @name QueryList 查询用户列表
   */
  export interface QueryList
    extends TypeCommon.PageTurning,
      Omit<Info, "token" | "isSuper"> {}

  /**
   * @name FreezeStatusChange 用户账号状态改变
   */
  export interface FreezeStatusChange extends Pick<Info, "_id" | "status"> {}
}
