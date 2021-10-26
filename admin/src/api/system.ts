import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
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
 * @name getRoleList 系统管理-获取角色详情
 */
export function getRoleDetails(params: TypeCommon.DatabaseMainParameter) {
  return request<TypeSystemRole.EditRoleParam>("system/role/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name addRole 系统管理-新增角色
 */
export function addRole(data: TypeSystemRole.EditRoleParam) {
  return request("system/role/add", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateRole 系统管理-更新角色信息
 */
export function updateRole(data: TypeSystemRole.EditRoleParam) {
  return request("system/role/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removeRole 系统管理-删除指定角色
 */
export function removeRole(params: TypeCommon.DatabaseMainParameter) {
  return request("system/role/remove", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}
