import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeSystemUser } from "@/interface/system/user";

/**
 * @name userLogin 用户登录
 */
export function userLogin(payload: TypeSystemUser.AccountSecret) {
  return {
    type: ENUM_STORE_ACTION.LOGIN.USER_LOGIN,
    payload,
  };
}

/**
 * @name getUserInfo 获取用户数据
 */
export function getUserInfo() {
  return {
    type: ENUM_STORE_ACTION.LOGIN.GET_USER_INFO,
  };
}

/**
 * @name setUserInfo 存储用户信息
 */
export function setUserInfo(payload: TypeSystemUser.Info) {
  return {
    type: ENUM_STORE_ACTION.LOGIN.SET_USER_INFO,
    payload,
  };
}

/**
 * @name delUserInfo 清空客户端用户数据
 */
export function delUserInfo() {
  return {
    type: ENUM_STORE_ACTION.LOGIN.DEL_USER_INFO,
  };
}
