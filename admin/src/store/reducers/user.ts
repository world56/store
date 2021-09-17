import Cookie from "js-cookie";

import { TOKEN_KEY } from "@/config/user";
import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";

import type { TypeStoreUserModule } from "@/interface/store";

const USER = {};

const userHandle: TypeStoreUserModule.Reducers = (state = USER, action) => {
  switch (action.type) {
    case ENUM_STORE_ACTION_TYPE.LOGIN.SET_USER_INFO:
      console.log("@store", action);
      const { payload } = action;
      return { ...payload };
    case ENUM_STORE_ACTION_TYPE.LOGIN.DEL_USER_INFO:
      Cookie.remove(TOKEN_KEY);
      return {};
    default:
      return state;
  }
};

export default userHandle;
