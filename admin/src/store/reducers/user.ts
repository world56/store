import Cookie from "js-cookie";
import { Reducer } from "redux";
import * as USER_ACTION_ENUM from "../action/user";

import type * as UserType from "@/interface/user";

export type UserState = Partial<typeof USER>;

export type UserAction = {
  params: UserType.Login.UserInfo;
  type: keyof typeof USER_ACTION_ENUM.USER_LOGIN;
};

const USER = {
  name: Cookie.get("_name"),
  token: Cookie.get("_token"),
};

const userHandle: Reducer<UserState, UserAction> = (state = USER, action) => {
  switch (action.type) {
    case USER_ACTION_ENUM.USER_LOGIN.SET_USER_INFO:
      const { params } = action;
      const expires = { expires: params ? 7 : 1 };
      Cookie.set("_token", params.token, expires);
      Cookie.set("_name", params.name, expires);
      return params;
    case USER_ACTION_ENUM.USER_LOGIN.DEL_USER_INFO:
      Cookie.remove("_token");
      return {};
    default:
      return state;
  }
};

export default userHandle;
