import request from "@/utils/request";
import { ENUM_HTTP } from "@/enum/http";

import { REQUEST_PREFIX } from "@/config/request";

import type { TypeCommon } from "@/interface/common";
import { TypeLog } from "@/interface/log";

/**
 * @name API_URL_UPLOAD 上传文件
 */
export const API_URL_UPLOAD = `${REQUEST_PREFIX}file/uploads`;

/**
 * @name removeFiles 删除文件
 */
export function removeFiles(data: { ids: number[] }) {
  return request<boolean>("file/remove", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}

/**
 * @name uploadFile 上传文件
 */
export function uploadFile(file: File) {
  const data = new FormData();
  data.append("file", file);
  return request<TypeCommon.File>("file/uploads", {
    data,
    method: ENUM_HTTP.REQUEST_MODE.POST,
    headers: { "Content-Type": ENUM_HTTP.CONTENT_TYPE.MULTIPART },
  });
}

/**
 * @name getLogs 查询日志
 */
export function getLogs(params: TypeLog.Query) {
  return request<TypeLog.DTO[]>("log/list", {
    method: ENUM_HTTP.REQUEST_MODE.GET,
    params,
  });
}

/**
 * @name insertLog 新增日志
 */
export function insertLog(data: TypeLog.Insert) {
  return request<TypeLog.DTO>("log/insert", {
    method: ENUM_HTTP.REQUEST_MODE.POST,
    data,
  });
}
