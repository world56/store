import { message } from "antd";
import Cookies from "js-cookie";
import { extend } from "umi-request";
import { HTTP_STATUS_CODE } from "@/constant/http";
import { REQUEST_TIMEOUT, REQUEST_PREFIX } from "@/config/request";

import * as ENUM_HTTP from "@/enum/http";
import { TOKEN_KEY } from "@/config/user";

import type { Response } from "express";
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
  (url, options) => {
    const headers = { Authorization: Cookies.get(TOKEN_KEY) as string };
    return {
      url,
      options: { ...options, headers },
    };
  },
  { global: true },
);

request.interceptors.response.use(
  async (res) => {
    try {
      const data = await res.clone().json();
      switch (data.code) {
        case ENUM_HTTP.HTTP_STATUS.OK:
          return Promise.resolve(data.content);
        case ENUM_HTTP.HTTP_STATUS.UNAUTHORIZED:
          Cookies.remove(TOKEN_KEY);
          message.warn(
            data?.message ||
              HTTP_STATUS_CODE[ENUM_HTTP.HTTP_STATUS.UNAUTHORIZED],
          );
          setTimeout(() => window.location.reload(), 1800);
          return Promise.reject();
        default:
          message.warn(data.message);
          return Promise.reject(data.content);
      }
    } catch (e) {
      message.warn(String(e));
      return Promise.reject(e);
    }
  },
  {
    global: true,
  },
);

export default request;
