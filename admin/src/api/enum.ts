import request from "@/utils/request";

import { ENUM_HTTP } from "@/enum/http";
import { ENUM_STORE } from "@/enum/store";

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from "@/interface/purchase/spec";
import type { TypeAdminUser } from "@/interface/system/user";
import type { TypeSystemRole } from "@/interface/system/role";
import type { TypeSystemDepartment } from "@/interface/system/department";
import type { TypeWarehousePosition } from "@/interface/warehouse/position";

/**
 * --------------------- 类目类型管理 ----------------------
 */

/**
 * @name getCategoryList 类目列表
 */
export function getCategoryList(params: { type: `${ENUM_STORE.CATEGORY}`[] }) {
  return request<TypeCommon.Category[]>("category/list", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertCategory 新增类目
 */
export function insertCategory(data: TypeCommon.Category) {
  return request<boolean>("category/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateCategory 编辑类目信息
 */
export function updateCategory(data: TypeCommon.Category) {
  return request<TypeCommon.Category[]>("category/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getCategoryDetails 获取类目详情
 */
export function getCategoryDetails(data: TypeCommon.DatabaseMainParameter) {
  return request<TypeCommon.Category>("category/details", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name checkCategoryFields 检测类目字段重复
 */
export function checkCategoryFields(
  params: Partial<Pick<TypeCommon.Category, "id" | "name" | "type">>,
) {
  return request<TypeCommon.Category>("category/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * --------------------- ENUM-API ----------------------
 */

/**
 * @name getAllAdminUserList 用户列表
 */
export function getAllAdminUserList() {
  return request<TypeAdminUser.DTO[]>("system/user/all", {
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

/**
 * @name getPurchaseSpplierList 供应商列表
 */
export function getPurchaseSpplierList() {
  return request<TypeWarehousePosition.DTO[]>("purchase/supplier/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getSpecAllTemplate 产品规格模板列表
 */
export function getSpecAllTemplate() {
  return request<TypeSpec.DTO[]>("purchase/spec/template/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}

/**
 * @name getSpecAllParameter 产品规格参数列表
 */
export function getSpecAllParameter() {
  return request<TypeSpec.SpecParameterDTO[]>("purchase/spec/parameter/all", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
  });
}
