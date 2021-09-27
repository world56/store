/**
 * @name ENUM_STORE_ACTION_TYPE 枚举-redux action
 */
export namespace ENUM_STORE_ACTION_TYPE {
  /**
   * @name LOGIN 登录类型
   */
  export enum LOGIN {
    SET_USER_INFO = "SET_USER_INFO",
    DEL_USER_INFO = "DEL_USER_INFO",
    GET_USER_INFO = "GET_USER_INFO",
    USER_LOGIN = "USER_LOGIN",
  }

  /**
   * @name SYSTEM 系统类型
   */
  export enum SYSTEM {
    SET_NAV_STATUS = "SET_NAV_STATUS",
  }
}
