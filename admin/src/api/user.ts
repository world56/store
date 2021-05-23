import request from "@/utils/request";

import type * as UserType from "@/interface/user";

export function login(data: UserType.Login.AccountSecret) {
  return request<{}>("/admin/user/login", {
    method: "POST",
    data,
  });
}
