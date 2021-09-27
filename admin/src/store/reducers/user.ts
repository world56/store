import Cookie from "js-cookie";

import { TOKEN_KEY } from "@/config/user";
import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeStoreUserModule } from "@/interface/store";

const USER_DEFAULT = {};

const userHandle: TypeStoreUserModule.Reducers = (state = USER_DEFAULT, action) => {
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
