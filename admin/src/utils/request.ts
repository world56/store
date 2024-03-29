import store from "@/store";
import { message } from "antd";
import Cookies from "js-cookie";
import { extend } from "umi-request";
import { ActionsUser } from "@/store/user";

import { ENUM_HTTP } from "@/enum/http";
import { TOKEN_KEY } from "@/config/user";
import { REQUEST_TIMEOUT, REQUEST_PREFIX } from "@/config/request";

import type { Response } from "express";
import type { ResponseError } from "umi-request";

/**
 * @name Gateway 网关
 * @param {number} code 请求状态CODE
 * @param {string} message 返回的消息
 * @param {boolean | void} 接口状态
 * @param {unknown | void} content as T 返回的业务数据
 */
export interface Gateway<T> {
  content: T;
  readonly message?: string;
  readonly success: boolean;
  readonly code: ENUM_HTTP.HTTP_CODE;
}

type Res = Response<Gateway<unknown>>;

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
    const headers = { Authorization: Cookies.get(TOKEN_KEY)! };
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
          store.dispatch(ActionsUser.delUserInfo());
          message.warning(data?.message || "账户异常");
          setTimeout(() => window.location.reload());
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
