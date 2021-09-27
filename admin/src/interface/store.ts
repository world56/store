import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";
import { SYSTEM_NAV_STATUS_KEY } from "@/config/system";

import type { Reducer } from "redux";
import type { TypeUser } from "./user";

export type TypeStoreAction<A extends string, P = void> = {
  type: A;
  payload: P;
};

export type TypeStoreReducers<S, E extends string, P = S> = Reducer<
  Partial<S>,
  {
    payload?: P;
    type: `${E}`;
  }
>;

/**
 * @name TypeStoreStatus 全局状态机
 */
export interface TypeStoreStatus {
  user: TypeStoreUserModule.Store;
  system: TypeStoreSystemModule.Store;
}

/**
 * @name TypeStoreUserModule 状态机-用户模块
 */
export namespace TypeStoreUserModule {
  export interface Store extends TypeUser.UserInfo {}

  export type Reducers = TypeStoreReducers<Store, ENUM_STORE_ACTION_TYPE.LOGIN>;

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

/**
 * @name TypeStoreSystemModule 状态机-系统设置模块
 */
export namespace TypeStoreSystemModule {
  export interface Store {
    [SYSTEM_NAV_STATUS_KEY]: boolean;
  }

  export type Reducers = TypeStoreReducers<
    Store,
    ENUM_STORE_ACTION_TYPE.SYSTEM,
    boolean
  >;

  /**
   * @name ActionSetNavCollapsed Action-展开、收起导航栏
   * @param {boolean} payload 可传递指定开启、关闭状态，传void 该方法自动将布尔值求反
   */
  export type ActionSetNavCollapsed = TypeStoreAction<
    ENUM_STORE_ACTION_TYPE.SYSTEM.SET_NAV_STATUS,
    boolean | void
  >;
}
