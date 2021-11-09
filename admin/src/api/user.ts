import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeSystemUser } from "@/interface/system/user";

/**
 * @name getPubilcKey 用户-获取公匙
 */
export function getPubilcKey() {
  return request<TypeSystemUser.PubilcKey>("user/establish", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name login 用户-登陆（获取token）
 */
export function login(data: string) {
  return request<string>("user/login", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getUserInfo 用户-获取用户信息
 */
export function getUserInfo() {
  return request<TypeSystemUser.UserInfo>("user/userInfo", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
  });
}

/**
 * @name register 用户-注册
 */
export function register(data: string) {
  return request("user/register", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name logOut 用户-注销
 */
export function logOut() {
  return request("user/logout", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}
