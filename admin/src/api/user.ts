import request from "@/utils/request";

import type * as UserType from "@/interface/user";

export function login(data: UserType.Login.AccountSecret) {
  return request<any>("/admin/user/login", {
    method: "POST",
    data,
  });
}

export function register(params: UserType.Login.RegisterUser) {
  return request("/admin/user/register", {
    method: "POST",
    params
  });
}
