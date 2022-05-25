import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehousePosition } from "@/interface/warehouse/position";

/**
 * --------------------- 仓位编排 ----------------------
 */

/**
 * @name getWarehousePositionList 获取仓库编排列表
 */
export function getWarehousePositionList(params: TypeWarehousePosition.Query) {
  return request<TypeCommon.ServiceReturn<TypeWarehousePosition.DTO[]>>(
    "warehouse/position/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getWarehousePositionDetails 获取仓库编排列表
 */
export function getWarehousePositionDetails(
  params: TypeCommon.DatabaseMainParameter,
) {
  return request<TypeWarehousePosition.DTO>("warehouse/position/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertWarehousePosition 新增仓位
 */
export function insertWarehousePosition(data: TypeWarehousePosition.DTO) {
  return request<boolean>("warehouse/position/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateWarehousePosition 编辑仓位
 */
export function updateWarehousePosition(data: TypeWarehousePosition.DTO) {
  return request<boolean>("warehouse/position/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name removeWarehousePosition 删除仓位
 */
export function removeWarehousePosition(
  data: TypeCommon.DatabaseMainParameter,
) {
  return request<boolean>("warehouse/position/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
