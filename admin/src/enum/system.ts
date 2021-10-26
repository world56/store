/**
 * @name ENUM_ADMIN_SYSTEM 系统管理模块枚举
 */
 export namespace ENUM_ADMIN_SYSTEM {
  /**
   * @name SUPER_ADMIN 是否为超管
   * @param NOT_SUPER 不是超管
   * @param SUPER 超管
   */
  export enum SUPER_ADMIN {
    NOT_SUPER,
    SUPER,
  }

  /**
   * @name ROLE_STATUS 角色状态
   * @param OPEN 激活
   * @param FREEZE 冻结
   */
  export enum ROLE_STATUS {
    FREEZE,
    OPEN,
  }
}
