import type { TypeCommon } from "../common";

/**
 * @name TypeSystemUser 系统管理-用户
 */
export namespace TypeSystemUser {
  /**
   * @name PubilcKey 用户模块-公匙
   */
  export type PubilcKey = string;

  /**
   * @name Login 用户模块-登录信息
   * @param account  账户
   * @param password 密码
   */
  export interface Login extends Record<"account" | "password", string> {}

  /**
   * @name Register 用户模块-注册信息
   * @param name  用户昵称
   * @param phone 联系手机号码
   */
  export interface Register extends Login, Record<"name" | "phone", string> {}

  /**
   * @name DTO 用户模块-基本信息
   * @param id     用户ID
   * @param avatar  头像
   * @param token   用户token
   * @param isSuper 是否超管
   * @param role    权限角色
   * @param email   电子邮件
   * @param Record  状态
   * @param remark  备注
   */
  export interface DTO
    extends Register,
      TypeCommon.DTO,
      Record<"token" | "isSuper", string> {
    email?: string;
    role?: number[];
    deps?: number[];
    avatar?:string;
  }

  /**
   * @name QueryList 查询用户列表
   */
  export interface QueryList
    extends TypeCommon.PageTurning,
      Omit<DTO, "token" | "isSuper"> {
    departmentId: number;
  }

  /**
   * @name FreezeStatusChange 用户账号状态改变
   */
  export interface FreezeStatusChange extends Pick<DTO, "id" | "status"> {}

  /**
   * @name EditUserPassword 修改用户密码
   * @param password 旧密码
   * @param newPassword 新密码
   */
  export interface EditUserPassword extends Pick<DTO, "id" | "password"> {
    newPassword: string;
  }
}
