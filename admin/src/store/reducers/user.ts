import Cookie from "js-cookie";
import { Reducer } from "redux";
import * as USER_ACTION from "../action/user";

export type UserState = typeof USER;

const USER = {
  id: Cookie.get("_id"),
  token: Cookie.get("_token"),
  phone: Cookie.get("_phone"),
  realName: Cookie.get("_realName"),
  roleType: Cookie.get("_roleType"),
  userName: Cookie.get("_userName"),
  activeStatus: Cookie.get("_activeStatus"),
};

const userHandle: Reducer<UserState> = (state = USER, action) => {
  switch (action.type) {
    case USER_ACTION.USER_LOGIN.SET_USER_INFO:
      const { data } = action;
      const expires = { expires: data.expires ? 7 : 1 };
      Cookie.set("_id", data.id, expires);
      Cookie.set("_token", data.token, expires);
      Cookie.set("_phone", data.phone, expires);
      Cookie.set("_realName", data.realName, expires);
      Cookie.set("_roleType", data.roleType, expires);
      Cookie.set("_userName", data.userName, expires);
      Cookie.set("_activeStatus", data.activeStatus, expires);
      return data;
    case USER_ACTION.USER_LOGIN.DEL_USER_INFO:
      Cookie.remove("_id");
      Cookie.remove("_token");
      Cookie.remove("_phone");
      Cookie.remove("_realName");
      Cookie.remove("_roleType");
      Cookie.remove("_userName");
      Cookie.remove("_activeStatus");
      return {};
    default:
      return state;
  }
};

export default userHandle;
