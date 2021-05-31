import { message } from "antd";
import { Response } from "express";
import { extend } from "umi-request";
import { HTTP_STATUS_CODE } from "@/constant/http";
import { REQUEST_TIMEOUT, REQUEST_PREFIX } from "@/config/request";

import type { ResponseError } from "umi-request";
import type { ResGateway } from "@/interface/common";

type Res = Response<ResGateway<unknown>>;

async function errorHandler(res: ResponseError): Promise<Res> {
  return Promise.reject(res.response);
}

const request = extend({
  prefix: REQUEST_PREFIX,
  timeout: REQUEST_TIMEOUT,
  errorHandler,
});

request.interceptors.request.use(
  (url, options) => ({
    url,
    options: {
      ...options,
      interceptors: true,
    },
  }),
  { global: true },
);

request.interceptors.response.use(
  async (res) => {
    try {
      const data = await res.clone().json();
      switch (data.code) {
        case 200:
          return Promise.resolve(data.content);
        case 401:
          message.warn(HTTP_STATUS_CODE[401]);
          // 需要走清除、重新登录逻辑
          return Promise.reject();
        default:
          message.warn(data.message);
          return Promise.reject(data.content);
      }
    } catch (e) {
      message.warn(e);
      return Promise.reject(e);
    }
  },
  { global: true },
);

export default request;
