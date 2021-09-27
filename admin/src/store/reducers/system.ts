import { isVoid } from "@/utils";
import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";
import { SYSTEM_NAV_STATUS_KEY } from "@/config/system";

import type { TypeStoreSystemModule } from "@/interface/store";

const SYSTEM_DEFAULT = {
  [SYSTEM_NAV_STATUS_KEY]: JSON.parse(
    localStorage.getItem(SYSTEM_NAV_STATUS_KEY) || "false",
  ),
};

const systemHandle: TypeStoreSystemModule.Reducers = (
  state = SYSTEM_DEFAULT,
  action,
) => {
  switch (action.type) {
    case ENUM_STORE_ACTION_TYPE.SYSTEM.SET_NAV_STATUS:
      const { payload } = action;
      const status = isVoid(payload) ? !state[SYSTEM_NAV_STATUS_KEY] : payload;
      localStorage.setItem(SYSTEM_NAV_STATUS_KEY, JSON.stringify(status));
      return { ...state, [SYSTEM_NAV_STATUS_KEY]: status };
    default:
      return state;
  }
};

export default systemHandle;
