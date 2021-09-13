import request from "@/utils/request";
import * as ENUM_HTTP from "@/enum/http";

import type * as UserType from "@/interface/user";

/**
 * @name getPubilcKey 用户-获取公匙
 */
export function getPubilcKey() {
  return request<UserType.Login.PubilcKey>("/admin/user/establish", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name login 用户-登陆
 */
export function login(data: string) {
  return request<UserType.Login.UserInfo>("/admin/user/login", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name register 用户-注册
 */
export function register(data: string) {
  return request("/admin/user/register", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name logOut 用户-注销
 */
export function logOut() {
  return request("/admin/user/logout", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}
