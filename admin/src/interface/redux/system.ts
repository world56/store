import { ENUM_STORE_ACTION } from "@/enum/store";
import { DEFAULT_SYSTEM } from "@/store/reducers/system";

import type { TypeReduxStatus } from ".";

/**
 * @name TypeStoreSystemModule 状态机-系统设置模块
 */
export namespace TypeStoreSystemModule {
  export type Reducers = TypeReduxStatus.Reducers<
    typeof DEFAULT_SYSTEM,
    ENUM_STORE_ACTION.SYSTEM,
    boolean
  >;

  /**
   * @name ActionSetNavCollapsed Action-展开、收起导航栏
   * @param {boolean} payload 可传递指定开启、关闭状态，传void 该方法自动将布尔值求反
   */
  export type ActionSetNavCollapsed = TypeReduxStatus.Action<
    ENUM_STORE_ACTION.SYSTEM.SET_NAV_STATUS,
    boolean | void
  >;
}
