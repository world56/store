import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeSystemRole } from "@/interface/system/role";
import type { TypeSystemUser } from "@/interface/system/user";
import type { TypeSystemDepartment } from "@/interface/system/department";
import type { TypeWarehousePosition } from "@/interface/warehouse/position";

/**
 * @name getAllAdminUserList 用户列表
 */
export function getAllAdminUserList() {
  return request<TypeSystemUser.DTO[]>("system/user/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getRoleSelectList 角色列表
 */
export function getRoleSelectList() {
  return request<TypeSystemRole.DTO[]>("system/role/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getAllDepartmentList 部门列表
 */
export function getAllDepartmentList() {
  return request<TypeSystemDepartment.DTO[]>("system/department/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getAllWarehouse 仓位列表
 */
export function getWarehouseAllList() {
  return request<TypeWarehousePosition.DTO[]>("warehouse/position/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}
