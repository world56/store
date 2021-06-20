import * as USER_ACTION from "../action/user";

// import type { UserState } from "../reducers/user";
import type * as UserType from "@/interface/user";

export const setUserInfo = (params: UserType.Login.UserInfo) => ({
  type: USER_ACTION.USER_LOGIN.SET_USER_INFO,
  params,
});

export const delUserInfo = () => ({
  type: USER_ACTION.USER_LOGIN.DEL_USER_INFO,
});

export const userLogin = (params: UserType.Login.AccountSecret) => ({
  type: USER_ACTION.USER_LOGIN.USER_LOGIN,
  params,
});
