/**
 * @name ENUM_STORE_ACTION 枚举-redux action
 */
export namespace ENUM_STORE_ACTION {
  /**
   * @name LOGIN 登录
   */
  export enum LOGIN {
    SET_USER_INFO = "SET_USER_INFO",
    DEL_USER_INFO = "DEL_USER_INFO",
    GET_USER_INFO = "GET_USER_INFO",
    USER_LOGIN = "USER_LOGIN",
  }

  /**
   * @name SYSTEM 系统
   */
  export enum SYSTEM {
    SET_NAV_STATUS = "SET_NAV_STATUS",
  }

  /**
   * @name DICTIONARIES 获取词典 
   */
  export enum DICTIONARIES {
    QUERY = "QUERY",
    SET = "SET",
    ROLE = "ROLE",
    ADMIN_USER = "ADMIN_USER",
    DEPARTMENT = "DEPARTMENT",
  }
}
