import Cookie from "js-cookie";

import { TOKEN_KEY } from "@/config/user";
import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeStoreUserModule } from "@/interface/redux/user";

const DEFAULT_USER = {};

const userHandle: TypeStoreUserModule.Reducers = (
  state = DEFAULT_USER,
  action,
) => {
  switch (action.type) {
    case ENUM_STORE_ACTION.LOGIN.SET_USER_INFO:
      const { payload } = action;
      return { ...payload };
    case ENUM_STORE_ACTION.LOGIN.DEL_USER_INFO:
      Cookie.remove(TOKEN_KEY);
      return {};
    default:
      return state;
  }
};

export default userHandle;
