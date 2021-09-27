/**
 * @name TypeSystemRole 系统管理-角色管理
 */
export namespace TypeSystemRole {
  /**
   * @name ReqList 请求-角色列表
   * @param name 角色名称
   * @param status 角色状态
   */
  export interface ReqRoleList {
    name?: string;
    status?: 0 | 1;
  }

  /**
   * @name ResRoleList 返回-角色列表
   */
  export type ResRoleList = [];
}
