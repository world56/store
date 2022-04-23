import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeSystemUser } from "@/interface/system/user";
import type { TypeSystemRole } from "@/interface/system/role";
import type { TypeSystemPermission } from "@/interface/system/permission";
import type { TypeSystemDepartment } from "@/interface/system/department";

/**
 * -------------------------用户管理-------------------------------------
 */

/**
 * @name getUserList 用户管理-获取用户列表
 */
export function getUserList(params: TypeSystemUser.QueryList) {
  return request<TypeCommon.ServiceReturn<TypeSystemUser.DTO[]>>(
    "system/user/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getAllAdminUserList 用户管理-获取用户列表
 */
export function getAllAdminUserList() {
  return request<TypeSystemUser.DTO[]>("system/user/allAdminUser", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name resetAdminUserPwd 用户管理-重置用户密码
 */
export function resetAdminUserPwd(data: TypeCommon.DatabaseMainParameter) {
  return request("system/user/resetPassword", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getAdminUserInfo 用户管理-获取用户详情
 */
export function getAdminUserInfo(params: TypeCommon.DatabaseMainParameter) {
  return request<TypeSystemUser.DTO>("system/user/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name addAdminUser 用户管理-新增用户
 */
export function addAdminUser(data: TypeSystemUser.DTO) {
  return request("system/user/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name addAdminUser 用户管理-编辑用户
 */
export function updateAdminUser(data: TypeSystemUser.DTO) {
  return request("system/user/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name checkAdminUserField 用户管理-字段查重
 */
export function checkAdminUserField(params: Partial<TypeSystemUser.DTO>) {
  return request<boolean>("system/user/checkFields", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name freezeAdminUser 用户管理-冻结用户
 */
export function freezeAdminUser(data: TypeSystemUser.FreezeStatusChange) {
  return request("system/user/freeze", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * -------------------------角色管理-------------------------------------
 */

/**
 * @name getRoleList 角色管理-获取角色列表
 */
export function getRoleList(params: TypeSystemRole.QueryList) {
  return request<TypeCommon.ServiceReturn<TypeSystemRole.DTO>>(
    "system/role/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getRoleSelectList 角色管理-获取全部角色列表
 */
export function getRoleSelectList() {
  return request<TypeSystemRole.DTO[]>("system/role/allRole", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getRoleList 角色管理-获取角色详情
 */
export function getRoleDetails(params: TypeCommon.DatabaseMainParameter) {
  return request<TypeSystemRole.DTO>("system/role/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertRole 角色管理-新增角色
 */
export function insertRole(data: TypeSystemRole.DTO) {
  return request("system/role/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateRole 角色管理-更新角色信息
 */
export function updateRole(data: TypeSystemRole.DTO) {
  return request("system/role/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removeRole 角色管理-删除指定角色
 */
export function removeRole(data: TypeCommon.DatabaseMainParameter) {
  return request("system/role/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name checkRoleField 角色管理-字段是否重复
 */
export function checkRoleField(params: Record<string, string | number | void>) {
  return request<boolean>("system/role/checkFields", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * -------------------------权限管理-------------------------------------
 */

/**
 * @name getRoleList 权限管理-获取权限列表
 */
export function getPermissionList(params: TypeSystemPermission.QueryList) {
  return request<TypeCommon.ServiceReturn<TypeSystemPermission.DTO>>(
    "system/permission/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name insertPermission 权限管理-新增权限
 */
export function insertPermission(data: TypeSystemPermission.DTO) {
  return request("system/permission/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updatePermission 权限管理-编辑权限
 */
export function updatePermission(data: TypeSystemPermission.DTO) {
  return request("system/permission/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removePermission 权限管理-删除权限
 */
export function removePermission(data: TypeCommon.DatabaseMainParameter) {
  return request("system/permission/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name checkPermissionField 权限管理-检查字段是否重复
 */
export function checkPermissionField(params: TypeSystemPermission.CheckFields) {
  return request("system/permission/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name getPermissionDetails 权限管理-获取权限详情
 */
export function getPermissionDetails(params: TypeCommon.DatabaseMainParameter) {
  return request<TypeSystemPermission.DTO>("system/permission/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name getPermissionTree 权限管理-获取权限树
 */
export function getPermissionTree() {
  return request<TypeSystemPermission.DTO[]>("system/permission/findAll", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * -------------------------部门管理-------------------------------------
 */

/**
 * @name getDepartmentList 部门管理-获取部门列表
 */
export function getDepartmentList(params: TypeSystemDepartment.QueryList) {
  return request<TypeCommon.ServiceReturn<TypeSystemDepartment.DTO[]>>(
    "system/department/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getAllDepartmentList 部门管理-获取全部部门列表
 */
export function getAllDepartmentList() {
  return request<TypeSystemDepartment.DTO[]>(
    "system/department/allDepartment",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
    },
  );
}

/**
 * @name insertDepartment 部门管理-新增部门
 */
export function insertDepartment(data: TypeSystemDepartment.DTO) {
  return request<TypeCommon.ServiceReturn<TypeSystemDepartment.DTO[]>>(
    "system/department/insert",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * @name updateDepartment 部门管理-编辑部门
 */
export function updateDepartment(data: TypeSystemDepartment.DTO) {
  return request<TypeCommon.ServiceReturn<TypeSystemDepartment.DTO[]>>(
    "system/department/update",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * @name getDepartmentDetails 部门管理-获取部门详情
 */
export function getDepartmentDetails(data: TypeCommon.DatabaseMainParameter) {
  return request<TypeSystemDepartment.DTO>("system/department/details", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removeDepartment 部门管理-删除部门
 */
export function removeDepartment(data: TypeCommon.DatabaseMainParameter) {
  return request("system/department/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
