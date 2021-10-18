import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeSystemRole } from "@/interface/system/role";

/**
 * @name getRoleList 系统管理-获取角色列表
 */
export function getRoleList(params: TypeSystemRole.ReqRoleList) {
  return request<TypeSystemRole.ResRoleList>("system/role/list", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name addRole 系统管理-新增角色
 */
export function addRole(data:TypeSystemRole.EditRoleParam) {
  return request("system/role/add", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data
  });
}
