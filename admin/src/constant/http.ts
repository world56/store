import { ENUM_HTTP } from "@/enum/http";

/**
 * @name CONSTANT_HTTP 常量-HTTP协议
 */
export namespace CONSTANT_HTTP {
  /**
   * @name HTTP_CODE_MESSAGE http状态码对应的几种提示消息
   */
  export const HTTP_CODE_MESSAGE = Object.freeze(<const>{
    [ENUM_HTTP.HTTP_CODE.OK]: "服务器成功返回请求的数据",
    [ENUM_HTTP.HTTP_CODE.BAD_REQUEST]:
      "发出的请求有错误，服务器没有进行新建或修改数据的操作",
    [ENUM_HTTP.HTTP_CODE.UNAUTHORIZED]: "用户登录超时，请尝试重新登录",
    [ENUM_HTTP.HTTP_CODE.FORBIDDEN]: "用户得到授权，但是访问是被禁止的",
    [ENUM_HTTP.HTTP_CODE.NOT_FOUND]:
      "发出的请求针对的是不存在的记录，服务器没有进行操作",
    [ENUM_HTTP.HTTP_CODE.NOT_ACCEPTABLE]: "请求的格式错误",
    [ENUM_HTTP.HTTP_CODE.GONE]: "请求的资源被永久删除，且不会再得到的",
    [ENUM_HTTP.HTTP_CODE.UNPROCESSABLE_ENTITY]:
      "当创建一个对象时，发生一个验证错误",
    [ENUM_HTTP.HTTP_CODE.INTERNAL_SERVER_ERROR]: "服务器发生错误，请检查服务器",
    [ENUM_HTTP.HTTP_CODE.BAD_GATEWAY]: "网关错误",
    [ENUM_HTTP.HTTP_CODE.SERVICE_UNAVAILABLE]:
      "服务不可用，服务器暂时过载或维护",
    [ENUM_HTTP.HTTP_CODE.GATEWAY_TIMEOUT]: "网关超时",
  });
}
