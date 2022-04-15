import store from "@/store";
import { message } from "antd";
import Cookies from "js-cookie";
import { extend } from "umi-request";
import { delUserInfo } from "@/store/action/user";
import { REQUEST_TIMEOUT, REQUEST_PREFIX } from "@/config/request";

import { ENUM_HTTP } from "@/enum/http";
import { TOKEN_KEY } from "@/config/user";
import { CONSTANT_HTTP } from "@/constant/http";

import type { Response } from "express";
import type { ResponseError } from "umi-request";
import type { TypeCommon } from "@/interface/common";

type Res = Response<TypeCommon.Gateway<unknown>>;

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
    return { url, options: { ...options, headers } };
  },
  { global: true },
);

request.interceptors.response.use(
  async (res) => {
    try {
      const data = await res.clone().json();
      switch (data.code) {
        case ENUM_HTTP.HTTP_CODE.OK:
          return Promise.resolve(data.content);
        case ENUM_HTTP.HTTP_CODE.UNAUTHORIZED:
          Cookies.remove(TOKEN_KEY);
          store.dispatch(delUserInfo());
          message.warn(
            data?.message ||
              CONSTANT_HTTP.HTTP_CODE_MESSAGE[ENUM_HTTP.HTTP_CODE.UNAUTHORIZED],
          );
          setTimeout(() => window.location.reload(), 1800);
          return Promise.reject();
        default:
          message.error(data.message);
          return Promise.reject(data);
      }
    } catch (e) {
      message.error(String(e));
      return Promise.reject(e);
    }
  },
  {
    global: true,
  },
);

export default request;
