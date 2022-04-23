import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeReduxStatus } from ".";
import type { TypeCommon } from "../common";

/**
 * @name TypeStoreDictionary 状态机-词典
 */
export namespace TypeStoreDictionary {
  export type StoreKey = Exclude<
    ENUM_STORE_ACTION.DICTIONARIES,
    ENUM_STORE_ACTION.DICTIONARIES.SET | ENUM_STORE_ACTION.DICTIONARIES.QUERY
  >;

  export interface Store
    extends Partial<Record<StoreKey, TypeReduxStatus.Dictionaries>> {}

  export type Reducers = TypeCommon.StoreReducers<
    Store,
    ENUM_STORE_ACTION.DICTIONARIES.SET,
    {
      type: StoreKey;
      data: TypeReduxStatus.Dictionaries;
    }
  >;

  /**
   * @name ActionGetDic 获取字典
   */
  export type ActionGetDic = TypeCommon.StoreAction<
    ENUM_STORE_ACTION.DICTIONARIES.QUERY,
    StoreKey
  >;
}
