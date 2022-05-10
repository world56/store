import { ENUM_STORE_ACTION } from "@/enum/store";
import { CONSTANT_SYSTEM } from "@/constant/system";
import { CONSTANT_COMMON } from "@/constant/common";
import { CONSTANT_WAREHOURE } from "@/constant/warehouse";

import type { TypeStoreDictionary } from "@/interface/redux/dictionary";

export const DEFAULT_DICTIONARY = {
  ...CONSTANT_COMMON,
  ...CONSTANT_SYSTEM,
  ...CONSTANT_WAREHOURE,
};

const dictionaryHandle: TypeStoreDictionary.Reducers = (
  state = DEFAULT_DICTIONARY,
  action,
) => {
  return ENUM_STORE_ACTION.DICTIONARIES.SET === action.type
    ? { ...state, [action.payload?.type!]: action.payload?.data }
    : state;
};

export default dictionaryHandle;
