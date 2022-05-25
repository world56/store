import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

/**
 * --------------------- 供应商列表 ----------------------
 */

/**
 * @name getPurchaseSupplierList 获取供应商列表
 */
export function getPurchaseSupplierList(params: TypePurchaseSupplier.Query) {
  return request<TypeCommon.ServiceReturn<TypePurchaseSupplier.DTO[]>>(
    "purchase/supplier/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getPurchaseSupplierDetails 获取供应商详情
 */
export function getPurchaseSupplierDetails(
  params: TypeCommon.DatabaseMainParameter,
) {
  return request<TypePurchaseSupplier.DTO>("purchase/supplier/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name checkPurchaseSupplierFields 检测供应商名称是否重复
 */
export function checkPurchaseSupplierFields(
  params: Pick<TypePurchaseSupplier.DTO, "id" | "name">,
) {
  return request("purchase/supplier/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertPurchaseSupplier 新增供应商
 */
export function insertPurchaseSupplier(
  data: TypePurchaseSupplier.EditSupplierDTO,
) {
  return request("purchase/supplier/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updatePurchaseSupplier 编辑供应商
 */
export function updatePurchaseSupplier(
  data: TypePurchaseSupplier.EditSupplierDTO,
) {
  return request("purchase/supplier/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
