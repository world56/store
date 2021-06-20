import request from "@/utils/request";

import type * as UserType from "@/interface/user";

export function getPubilcKey() {
  return request<UserType.Login.PubilcKey>("/admin/user/establish", {
    method: "GET",
  });
}

export function login(data:string) {
  return request<UserType.Login.UserInfo>("/admin/user/login", {
    method: "POST",
    data,
  });
}

export function register(params: UserType.Login.RegisterUser) {
  return request("/admin/user/register", {
    method: "POST",
    params,
  });
}


export function testJWT(){
  return request("/admin/user/list", {
    method: "GET",
  });
}
