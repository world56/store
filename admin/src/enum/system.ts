/**
 * @name ENUM_SYSTEM 枚举-系统管理模块
 */
export namespace ENUM_SYSTEM {
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
   * @name PERMISSION_TYPE 权限类型
   * @param PAGE 页面
   * @param BUTTON 按钮
   * @param CONTENT 内容
   */
  export enum PERMISSION_TYPE {
    PAGE,
    BUTTON,
    CONTENT,
  }

  /**
   * @name EDIT_USER 编辑用户方式
   * @param SUPER 注册超级管理员
   * @param ADMIN 系统模块新增、编辑用户
   * @param PERSONAL 个人编辑个人信息
   */
  export enum EDIT_USER {
    SUPER,
    ADMIN,
    PERSONAL,
  }
}
