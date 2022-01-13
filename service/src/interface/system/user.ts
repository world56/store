import { ENUM_ADMIN } from '@/enum/admin';
import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '../common';

/**
 * @name TypeSystemUser 后台管理系统-用户模块
 */
export namespace TypeSystemUser {
  /**
   * @name LoginAccountSecret 用户登陆
   * @param account 账号
   * @param password 密码
   */
  export interface LoginAccountSecret {
    account: string;
    password: string;
  }

  /**
   * @name Info 后台管理系统用户基本信息
   * @param isSuper 1超管 2普通用户
   * @param name 用户名称
   * @param phone 联系电话
   * @param status 用户状态
   * @param createTime 创建时间
   * @param role 所属权限角色
   */
  export interface Info
    extends LoginAccountSecret,
      Record<'name' | 'phone', string>,
      Partial<TypeCommon.DatabaseMainParameter> {
    createTime: number;
    status: ENUM_COMMON.STATUS;
    isSuper: ENUM_ADMIN.ADMINISTRATOR;
    role: string[];
  }

  /**
   * @name QueryList 查询用户列表
   */
  export interface QueryList
    extends TypeCommon.QueryListDefaultParam,
      Omit<Info, 'token' | 'password'> {}

  /**
   * @name FreezeStatusChange 用户账号状态改变
   */
  export interface FreezeStatusChange extends Pick<Info, '_id' | 'status'> {}
}
