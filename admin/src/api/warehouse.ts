import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehouseArrangement } from "@/interface/warehouse/arrangement";

/**
 * --------------------- 仓位编排 ----------------------
 */

/**
 * @name getWarehouseArrangementList 获取仓库编排列表
 */
export function getWarehouseArrangementList(
  params: TypeWarehouseArrangement.QueryList,
) {
  return request<TypeCommon.ServiceReturn<TypeWarehouseArrangement.DTO[]>>(
    "warehouse/arrangement/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getWarehouseArrangementDetails 获取仓库编排列表
 */
export function getWarehouseArrangementDetails(
  params: TypeCommon.DatabaseMainParameter,
) {
  return request<TypeWarehouseArrangement.DTO>(
    "warehouse/arrangement/details",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name insertWarehouseArrangement 新增仓位
 */
export function insertWarehouseArrangement(data: TypeWarehouseArrangement.DTO) {
  return request<boolean>("warehouse/arrangement/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updatetWarehouseArrangement 编辑仓位
 */
export function updatetWarehouseArrangement(
  data: TypeWarehouseArrangement.DTO,
) {
  return request<boolean>("warehouse/arrangement/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removeWarehouseArrangement 删除仓位
 */
export function removeWarehouseArrangement(
  data: TypeCommon.DatabaseMainParameter,
) {
  return request<boolean>("warehouse/arrangement/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
