import request from "@/utils/request";

import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from "@/interface/purchase/spec";
import type { TypePurchaseOrder } from "@/interface/purchase/order";
import type { TypeSupplierProduct } from "@/interface/purchase/product";
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
  params: TypeCommon.FieldsIsRepeatDTO,
) {
  return request("purchase/supplier/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name changePurchaseSupplierStatus 改变供应商状态
 */
export function changePurchaseSupplierStatus(
  data: TypePurchaseSupplier.EditStatus,
) {
  return request("purchase/supplier/status", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name addPurchaseSupplierFile 新增附件（详情页）
 */
export function addPurchaseSupplierFile(data: TypePurchaseSupplier.AddFile) {
  return request("purchase/supplier/addFile", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name insertPurchaseSupplier 新增供应商
 */
export function insertPurchaseSupplier(data: TypePurchaseSupplier.EditDTO) {
  return request("purchase/supplier/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updatePurchaseSupplier 编辑供应商
 */
export function updatePurchaseSupplier(data: TypePurchaseSupplier.EditDTO) {
  return request("purchase/supplier/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getPurchaseSupplierLogs 供应商日志
 */
export function getPurchaseSupplierLogs(params: TypePurchaseSupplier.QueryLog) {
  return request<TypePurchaseSupplier.LogDTO[]>("purchase/supplier/logs", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertPurchaseSupplierLog 新增供应商日志
 */
export function insertPurchaseSupplierLog(data: TypePurchaseSupplier.LogDTO) {
  return request<TypePurchaseSupplier.LogDTO>("purchase/supplier/addLog", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * --------------------- 产品规格 ----------------------
 */

/**
 * @name getSpecTemplateList 获取产品规格模板列表
 */
export function getSpecTemplateList(params: TypeSpec.Query) {
  return request<TypeCommon.ServiceReturn<TypeSpec.DTO>>(
    "purchase/spec/template/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getSpecTemplateDetails 获取产品规格模板详情
 */
export function getSpecTemplateDetails(data: TypeCommon.DatabaseMainParameter) {
  return request<TypeSpec.DTO>("purchase/spec/template/details", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name insertSpecTemplate 新增产品规格模板
 */
export function insertSpecTemplate(data: TypeSpec.EditDTO) {
  return request<TypeSpec.DTO>("purchase/spec/template/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateSpecTemplate 更新产品规格模板
 */
export function updateSpecTemplate(data: TypeSpec.EditDTO) {
  return request<TypeSpec.DTO>("purchase/spec/template/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name checkSpecTemplateFields 产品规格模板名称是否重复
 */
export function checkSpecTemplateFields(params: TypeCommon.FieldsIsRepeatDTO) {
  return request<boolean>("purchase/spec/template/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name changeSpecTemplateStatus 改变产品规格状态
 */
export function changeSpecTemplateStatus(data: TypeSpec.ChangeStatus) {
  return request<TypeSpec.ChangeStatus>("purchase/spec/template/status", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getSpecParameterList 获取产品规格参数列表
 */
export function getSpecParameterList(params: TypeSpec.Query) {
  return request<TypeCommon.ServiceReturn<TypeSpec.SpecParameterDTO>>(
    "purchase/spec/parameter/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name checkSpecParameterFields 批量添加规格参数
 */
export function checkSpecParameterFields(
  data: Pick<TypeSpec.SpecParameterDTO, "id" | "name">,
) {
  return request<boolean>("purchase/spec/parameter/check", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name getSpecParameterDetails 获取产品规格详情
 */
export function getSpecParameterDetails(params: {
  ids: TypeCommon.DatabaseMainParameter["id"][];
}) {
  return request<TypeSpec.SpecParameterDTO[]>(
    "purchase/spec/parameter/details",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name insertsSpecParameter 批量添加规格参数
 */
export function insertsSpecParameter(data: TypeSpec.EditSpecParameter) {
  return request<TypeSpec.EditSpecParameter>(
    "purchase/spec/parameter/inserts",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * @name updatesSpecParameter 批量添加规格参数
 */
export function updatesSpecParameter(data: TypeSpec.EditSpecParameter) {
  return request<TypeSpec.EditSpecParameter>(
    "purchase/spec/parameter/updates",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * @name updatesSpecParameterRelation 规格参数关联规格类目
 */
export function updatesSpecParameterRelation(
  data: TypeSpec.ParameterRelationCategory,
) {
  return request<TypeSpec.EditSpecParameter>(
    "purchase/spec/parameter/relation",
    {
      method: ENUM_HTTP.REQUEST_MODE.POST,
      data,
    },
  );
}

/**
 * --------------------- 供应产品 ----------------------
 */

/**
 * @name getSupplierProductList 获取供应产品列表
 */
export function getSupplierProductList(params: TypeSupplierProduct.Query) {
  return request<TypeCommon.ServiceReturn<TypeSupplierProduct.DTO>>(
    "purchase/product/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name querySupplierProduct 查询指定供应产品
 */
export function querySupplierProduct(
  params: Pick<TypeSupplierProduct.Query, "name" | "supplierId">,
) {
  return request<TypeSupplierProduct.DTO[]>("purchase/product/query", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name getSupplierProductDetails 获取供应产品详情
 */
export function getSupplierProductDetails(
  params: TypeCommon.DatabaseMainParameter,
) {
  return request<TypeSupplierProduct.DTO>("purchase/product/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name checkSupplierProductFields 见擦好供应产品名称是否重复
 */
export function checkSupplierProductFields(
  params: TypeCommon.FieldsIsRepeatDTO,
) {
  return request<boolean>("purchase/product/check", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertSupplierProduct 新增供应产品
 */
export function insertSupplierProduct(data: TypeSupplierProduct.EditDTO) {
  return request<TypeSupplierProduct.DTO>("purchase/product/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateSupplierProduct 编辑供应产品
 */
export function updateSupplierProduct(data: TypeSupplierProduct.EditDTO) {
  return request<TypeSupplierProduct.DTO>("purchase/product/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * --------------------- 采购订单管理 ----------------------
 */

/**
 * @name getPurchaseOrderList 获取采购订单列表
 */
export function getPurchaseOrderList(params: TypePurchaseOrder.Query) {
  return request<TypeCommon.ServiceReturn<TypePurchaseOrder.DTO[]>>(
    "purchase/order/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getPurchaseOrderDetails 获取采购订单详情
 */
export function getPurchaseOrderDetails(
  data: Pick<TypePurchaseOrder.DTO, "id">,
) {
  return request<TypePurchaseOrder.DTO>("purchase/order/details", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name insertPurchaseOrder 新增采购订单
 */
export function insertPurchaseOrder(data: TypePurchaseOrder.EditDTO) {
  return request<boolean>("purchase/order/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updatePurchaseOrder 更新采购订单
 */
export function updatePurchaseOrder(data: TypePurchaseOrder.EditDTO) {
  return request<boolean>("purchase/order/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
