import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeCommon } from "../common";
import type { TypeSystemUser } from "../system/user";

/**
 * @name TypeStoreUserModule 状态机-用户模块
 */
export namespace TypeStoreUserModule {
  export interface Store extends TypeSystemUser.DTO {}

  export type Reducers = TypeCommon.StoreReducers<
    Store,
    ENUM_STORE_ACTION.LOGIN
  >;

  /**
   * @name ActionUserLogin Action-用户登陆
   */
  export type ActionUserLogin = TypeCommon.StoreAction<
    ENUM_STORE_ACTION.LOGIN.USER_LOGIN,
    TypeSystemUser.Login
  >;

  /**
   * @name ActionSetUserInfo Action-存储用户信息
   */
  export type ActionSetUserInfo = TypeCommon.StoreAction<
    ENUM_STORE_ACTION.LOGIN.SET_USER_INFO,
    Store
  >;
}
