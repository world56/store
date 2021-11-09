import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeSystemRole } from "@/interface/system/role";
import type { TypeSystemPermission } from "@/interface/system/permission";

/**
 * @name getRoleList 系统管理-获取角色列表
 */
export function getRoleList(params: TypeSystemRole.ReqRoleList) {
  return request<TypeCommon.ServiceReturn<TypeSystemRole.EditRoleParam>>(
    "system/role/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
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

/**
 * @name checkRoleField 系统管理-字段是否重复
 */
export function checkRoleField(params: Record<string, string | void>) {
  return request("system/role/fieldCheck", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name getRoleList 系统管理-获取权限列表
 */
export function getPermissionList(
  params: TypeSystemPermission.ReqPermissionList,
) {
  return request<TypeCommon.ServiceReturn<TypeSystemPermission.EditPermission>>(
    "system/permission/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name addCommodityDetails 系统管理-新增商品
 */
export function addCommodityDetails(data: TypeSystemPermission.EditPermission) {
  return request("system/permission/add", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
