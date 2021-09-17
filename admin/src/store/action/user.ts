import type { TypeUser } from "@/interface/user";
import { ENUM_STORE_ACTION_TYPE } from "@/enum/store";

/**
 * @name userLogin 用户登录
 */
export function userLogin(payload: TypeUser.AccountSecret) {
  return {
    type: ENUM_STORE_ACTION_TYPE.LOGIN.USER_LOGIN,
    payload,
  };
}

/**
 * @name getUserInfo 获取用户数据
 */
export function getUserInfo() {
  return {
    type: ENUM_STORE_ACTION_TYPE.LOGIN.GET_USER_INFO,
  };
}

/**
 * @name setUserInfo 存储用户信息
 */
export function setUserInfo(payload: TypeUser.UserInfo) {
  return {
    type: ENUM_STORE_ACTION_TYPE.LOGIN.SET_USER_INFO,
    payload,
  };
}

/**
 * @name delUserInfo 清空客户端用户数据
 */
export function delUserInfo() {
  return {
    type: ENUM_STORE_ACTION_TYPE.LOGIN.DEL_USER_INFO,
  };
}
