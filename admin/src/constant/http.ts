import * as ENUM_HTTP from "@/enum/http";

export const HTTP_STATUS_CODE = Object.freeze(<const>{
  [ENUM_HTTP.HTTP_STATUS.OK]: "服务器成功返回请求的数据",
  [ENUM_HTTP.HTTP_STATUS.BAD_REQUEST]:
    "发出的请求有错误，服务器没有进行新建或修改数据的操作",
  [ENUM_HTTP.HTTP_STATUS.UNAUTHORIZED]: "用户登录超时，请尝试重新登录",
  [ENUM_HTTP.HTTP_STATUS.FORBIDDEN]: "用户得到授权，但是访问是被禁止的",
  [ENUM_HTTP.HTTP_STATUS.NOT_FOUND]:
    "发出的请求针对的是不存在的记录，服务器没有进行操作",
  [ENUM_HTTP.HTTP_STATUS.NOT_ACCEPTABLE]: "请求的格式错误",
  [ENUM_HTTP.HTTP_STATUS.GONE]: "请求的资源被永久删除，且不会再得到的",
  [ENUM_HTTP.HTTP_STATUS.UNPROCESSABLE_ENTITY]:
    "当创建一个对象时，发生一个验证错误",
  [ENUM_HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR]: "服务器发生错误，请检查服务器",
  [ENUM_HTTP.HTTP_STATUS.BAD_GATEWAY]: "网关错误",
  [ENUM_HTTP.HTTP_STATUS.SERVICE_UNAVAILABLE]:
    "服务不可用，服务器暂时过载或维护",
  [ENUM_HTTP.HTTP_STATUS.GATEWAY_TIMEOUT]: "网关超时",
});
