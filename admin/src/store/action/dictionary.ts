import { ENUM_STORE_ACTION } from "@/enum/store";
import { TypeReduxStatus } from "@/interface/redux";

/**
 * @name getDictionaries 获取词典
 */
export function getDictionaries(
  payload: keyof typeof ENUM_STORE_ACTION.DICTIONARIES,
) {
  return {
    type: ENUM_STORE_ACTION.DICTIONARIES.QUERY,
    payload,
  };
}

/**
 * @name setDictionaries 存词典
 */
export function setDictionaries(payload: {
  type: Exclude<
    keyof typeof ENUM_STORE_ACTION.DICTIONARIES,
    ENUM_STORE_ACTION.DICTIONARIES.SET | ENUM_STORE_ACTION.DICTIONARIES.QUERY
  >;
  data: TypeReduxStatus.Dictionaries;
}) {
  return {
    type: ENUM_STORE_ACTION.DICTIONARIES.SET,
    payload,
  };
}
