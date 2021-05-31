import Cookie from "js-cookie";
import { Reducer } from "redux";
import * as USER_ACTION_ENUM from "../action/user";

import type * as UserType from "@/interface/user";

export type UserState = Partial<typeof USER>;

export type UserAction = {
  data: UserType.Login.UserInfo;
  type: keyof typeof USER_ACTION_ENUM.USER_LOGIN;
};

const USER = {
  token: Cookie.get("_token"),
};

const userHandle: Reducer<UserState, UserAction> = (state = USER, action) => {
  switch (action.type) {
    case USER_ACTION_ENUM.USER_LOGIN.SET_USER_INFO:
      const { data } = action;
      const expires = { expires: data.expires ? 7 : 1 };
      Cookie.set("_token", data.token, expires);
      return data;
    case USER_ACTION_ENUM.USER_LOGIN.DEL_USER_INFO:
      Cookie.remove("_token");
      return {};
    default:
      return state;
  }
};

export default userHandle;
