import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehousePosition } from "@/interface/warehouse/position";
import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";
import { TypeWarehousingAudit } from "@/interface/warehouse/audit";

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
 * @name checkWarehousePositionName 仓库（仓位）名称是否重复
 */
export function checkWarehousePositionName(data: TypeCommon.FieldsIsRepeatDTO) {
  return request<boolean>("warehouse/position/check", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
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

/**
 * --------------------- 待入库 ----------------------
 */

/**
 * @name getWarehousingList 获取待入库列表
 */
export function getWarehousingList(params: TypeWarehouseWarehousing.Query) {
  return request<TypeCommon.ServiceReturn<TypeWarehouseWarehousing.DTO>>(
    "warehouse/warehousing/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getWarehousingInfo 获取入库基本信息
 */
export function getWarehousingInfo(data: TypeCommon.DatabaseMainParameter) {
  return request<TypeWarehouseWarehousing.DTO>(
    "warehouse/warehousing/details",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}


/**
 * @name confirmReceiving 确认收货
 */
export function confirmReceiving(data: TypeCommon.DatabaseMainParameter) {
  return request<boolean>("warehouse/warehousing/receiving", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name confirmWarehousing 清点确认入库产品
 */
export function confirmWarehousing(
  data: TypeWarehouseWarehousing.ConfirmPurchaseWarehousing,
) {
  return request<TypeWarehouseWarehousing.DTO>(
    "warehouse/warehousing/confirm",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * --------------------- 仓储审核 ----------------------
 */

/**
 * @name getWarehouseAuditList 获取仓储审核列表
 */
export function getWarehouseAuditList(params: TypeWarehousingAudit.Query) {
  return request<TypeCommon.ServiceReturn<TypeWarehousingAudit.DTO>>(
    "warehouse/audit/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getWarehouseAuditPurchaseDetails 获取仓储审核关联信息-采购入库
 */
export function getWarehouseAuditPurchaseDetails(
  data: TypeWarehousingAudit.QueryPurchaseOrderAudit,
) {
  return request<TypeWarehousingAudit.PurchaseOrderAuditDetails>(
    "warehouse/audit/purchase",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * @name auditWarehouse 审核出入库单
 */
export function auditWarehouse(data: TypeWarehousingAudit.AuditBusiness) {
  return request<boolean>(`warehouse/audit/${data.id}`, {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
