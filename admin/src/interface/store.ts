import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";

import type { Reducer } from "redux";
import type { TypeUser } from "./user";

/**
 * @name TypeStoreAction 发起Action
 */
export type TypeStoreAction<A extends string, P = void> = {
  type: A;
  payload: P;
};

/**
 * @name TypeStoreUserModule 状态机-用户模块
 */
export namespace TypeStoreUserModule {
  export interface Store extends TypeUser.UserInfo {}

  export type Reducers = Reducer<
    Partial<Store>,
    {
      payload?: Store;
      type: `${ENUM_STORE_ACTION_TYPE.LOGIN}`;
    }
  >;

  /**
   * @name ActionUserLogin Action-用户登陆
   */
  export type ActionUserLogin =
    TypeStoreAction<ENUM_STORE_ACTION_TYPE.LOGIN.USER_LOGIN>;

  /**
   * @name ActionSetUserInfo Action-存储用户信息
   */
  export type ActionSetUserInfo = TypeStoreAction<
    ENUM_STORE_ACTION_TYPE.LOGIN.SET_USER_INFO,
    Store
  >;
}
