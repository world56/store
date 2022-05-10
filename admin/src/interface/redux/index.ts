import combineReducers from "@/store/reducers";

import type { Reducer } from "redux";
import type { TypeCommon } from "../common";

/**
 * @name TypeReduxStatus redux状态机
 */
export namespace TypeReduxStatus {
  export type Store = ReturnType<typeof combineReducers>;

  export interface Dictionaries {
    readonly OBJ: Readonly<TypeCommon.GenericObject>;
    readonly LIST: Readonly<TypeCommon.DefaultKey[] & { parentId?: number }>;
  }

  /**
   * @name Action 状态机Actions
   */
  export type Action<A extends string, P = void> = {
    type: A;
    payload: P;
  };

  /**
   * @name Reducers 状态机容器
   */
  export type Reducers<S, E extends string, P = S> = Reducer<
    Partial<S>,
    { payload?: P; type: `${E}` }
  >;
}
