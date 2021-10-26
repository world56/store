import { ENUM_ADMIN_SYSTEM } from '@/enum/system';

/**
 * @name TypeSystemRole 系统管理-角色管理
 */
export namespace TypeSystemRole {
  /**
   * @name ReqList 🕵️‍♂️查询-角色列表
   * @param name 角色名称
   * @param status 角色状态
   */
  export interface ReqRoleList {
    name?: string;
    status?: ENUM_ADMIN_SYSTEM.ROLE_STATUS;
  }

  /**
   * @name EditRoleParam 🆕更新-编辑、新增角色
   * @param _id 角色ID
   * @param name 角色名称
   * @param status 状态
   * @param description 描述
   * @param createTime 创建时间
   */
  export interface EditRoleParam
    extends Record<'name' | 'description', string> {
    _id?: string;
    status: number;
    createTime?: number;
  }
}
