import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeStoreDictionary } from "@/interface/redux/dictionary";

const DEFAULT_DICTIONARY = {};

const dictionaryHandle: TypeStoreDictionary.Reducers = (
  state = DEFAULT_DICTIONARY,
  action,
) => {
  return ENUM_STORE_ACTION.DICTIONARIES.SET === action.type
    ? { ...state, [action.payload?.type!]: action.payload?.data }
    : state;
};

export default dictionaryHandle;
