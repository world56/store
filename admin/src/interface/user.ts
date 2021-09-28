export namespace TypeUser {
  /**
   * @name PubilcKey 用户模块-公匙
   */
  export type PubilcKey = string;

  /**
   * @name AccountSecret 用户模块-登录信息
   * @param account  账户
   * @param password 密码
   * @param expires  有效期
   */
  export interface AccountSecret
    extends Record<"account" | "password" | "expires", string> {}

  /**
   * @name RegisterUser 用户模块-注册信息
   * @param name  用户昵称
   * @param phone 联系手机号码
   */
  export interface RegisterUser
    extends AccountSecret,
      Record<"name" | "phone", string> {}

  /**
   * @name UserInfo 用户模块-基本信息
   * @param _id     用户ID
   * @param token   用户token
   * @param isSuper 是否超管
   */
  export type UserInfo = Omit<RegisterUser, "password"> &
    Record<"_id" | "token" | "isSuper", string>;
}
