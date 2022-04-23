import type { TypeCommon } from "../common";
import type { TypeStoreUserModule } from "./user";
import type { TypeStoreSystemModule } from "./system";
import type { TypeStoreDictionary } from "./dictionary";

/**
 * @name TypeReduxStatus redux状态机
 */
export namespace TypeReduxStatus {
  export interface Store {
    user: TypeStoreUserModule.Store;
    system: TypeStoreSystemModule.Store;
    dictionary: TypeStoreDictionary.Store;
  }

  export interface Dictionaries {
    obj: TypeCommon.GenericObject;
    list: TypeCommon.DefaultKey[] & { parentId?: number };
  }
}
