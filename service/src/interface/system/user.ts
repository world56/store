import { ENUM_ADMIN } from '@/enum/admin';

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
   * @name UserInfo 后台管理系统用户基本信息
   * @param isSuper 1超管 2普通用户
   * @param name 用户名称
   * @param phone 联系电话
   * @param createTime 创建时间
   */
  export interface UserInfo
    extends LoginAccountSecret,
      Record<'phone' | 'createTime', number>,
      Partial<TypeCommon.DatabaseMainParameter> {
    name: string;
    isSuper: ENUM_ADMIN.ADMINISTRATOR;
  }
}
