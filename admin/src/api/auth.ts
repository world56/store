import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeAdminUser } from "@/interface/system/user";

/**
 * @name register 注册
 */
export function register(data: TypeAdminUser.Register) {
  return request<boolean>("auth/register", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name login 登陆
 */
export function login(data: TypeAdminUser.Login) {
  return request<string>("auth/login", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name logOut 注销
 */
export function logOut() {
  return request("auth/logout", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getPublicKey 获取公匙
 */
export function getPublicKey() {
  return request<TypeAdminUser.PublicKey>("auth/establish", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getUserInfo 获取当前用户信息
 */
export function getUserInfo() {
  return request<TypeAdminUser.DTO>("auth/userInfo", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
  });
}

/**
 * @name superAdminStatus 系统是否存在超管
 */
export function superAdminStatus() {
  return request<boolean>("auth/superAdminStatus", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name updateUserPwd 修改用户密码
 */
export function updateUserPwd(data:TypeAdminUser.EditUserPassword) {
  return request<boolean>("auth/updatePwd", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data
  });
}
