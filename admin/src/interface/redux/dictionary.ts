import { ENUM_STORE_ACTION } from "@/enum/store";
import { DEFAULT_DICTIONARY } from "@/store/reducers/dictionary";

import type { TypeReduxStatus } from ".";

/**
 * @name TypeStoreDictionary 状态机-词典
 */
export namespace TypeStoreDictionary {
  export type Keys = Exclude<
    ENUM_STORE_ACTION.DICTIONARIES,
    ENUM_STORE_ACTION.DICTIONARIES.SET | ENUM_STORE_ACTION.DICTIONARIES.QUERY
  >;

  export type Reducers = TypeReduxStatus.Reducers<
    Partial<
      Record<
        Keys | keyof typeof DEFAULT_DICTIONARY,
        TypeReduxStatus.Dictionaries
      >
    >,
    ENUM_STORE_ACTION.DICTIONARIES.SET,
    {
      type: Keys;
      data: TypeReduxStatus.Dictionaries;
    }
  >;

  /**
   * @name ActionGetDic 获取字典
   */
  export type ActionGetDic = TypeReduxStatus.Action<
    ENUM_STORE_ACTION.DICTIONARIES.QUERY,
    Keys
  >;
}
