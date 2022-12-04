import request from "@/utils/request";

import { ENUM_HTTP } from "@/enum/http";

import type { TypeCommon } from "@/interface/common";
import type { TypeFinancePayment } from "@/interface/finance/payment";
import type { TypeFinancePaymentAccount } from "@/interface/finance/account";

/**
 * --------------------- 财务应付款列表 ----------------------
 */

/**
 * @name getPaymentList 获取应付款列表
 */
export function getPaymentList(params: TypeFinancePayment.Query) {
  return request<TypeCommon.ServiceReturn<TypeFinancePayment.DTO>>(
    "finance/payment/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * --------------------- 供应商收款账户 ----------------------
 */

/**
 * @name getCollectionAccountList 获取供应商收款账户列表
 */
export function getCollectionAccountList(
  params: TypeFinancePaymentAccount.Query,
) {
  return request<TypeCommon.ServiceReturn<TypeFinancePaymentAccount.DTO>>(
    "finance/account/list",
    {
      method: ENUM_HTTP.REQUEST_MODE.GET,
      params,
    },
  );
}

/**
 * @name getCollectionAccountDetails 获取供应商付款账户详情
 */
export function getCollectionAccountDetails(
  params: Pick<TypeFinancePaymentAccount.DTO, "id">,
) {
  return request<TypeFinancePaymentAccount.DTO>("finance/account/details", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertCollectionAccount 新增供应商付款账户
 */
export function insertCollectionAccount(data: TypeFinancePaymentAccount.DTO) {
  return request<boolean>("finance/account/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name updateCollectionAccount 更新供应商付款账户信息
 */
export function updateCollectionAccount(data: TypeFinancePaymentAccount.DTO) {
  return request<boolean>("finance/account/update", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
