import { ENUM_STORE_ACTION } from "@/enum/store";
import { DEFAULT_USER } from "@/store/reducers/user";

import type { TypeReduxStatus } from ".";
import type { TypeSystemUser } from "../system/user";

/**
 * @name TypeStoreUserModule 状态机-用户模块
 */
export namespace TypeStoreUserModule {
  export type Reducers = TypeReduxStatus.Reducers<
    typeof DEFAULT_USER,
    ENUM_STORE_ACTION.LOGIN
  >;

  /**
   * @name ActionUserLogin Action-用户登陆
   */
  export type ActionUserLogin = TypeReduxStatus.Action<
    ENUM_STORE_ACTION.LOGIN.USER_LOGIN,
    TypeSystemUser.Login
  >;

  /**
   * @name ActionSetUserInfo Action-存储用户信息
   */
  export type ActionSetUserInfo = TypeReduxStatus.Action<
    ENUM_STORE_ACTION.LOGIN.SET_USER_INFO,
    typeof DEFAULT_USER
  >;
}
