import { Avatar, Tooltip } from 'antd';
import styles from './index.module.sass';
import ICON_DEFAULT from '@/resource/icon.jpg';

import type { TypeAdminUser } from '@/interface/system/user';

interface TypeUserTooltipProps {
  /**
   * @param user 用户DTO
   */
  user?: TypeAdminUser.DTO;
  /**
   * @param type children 展示的内容 avatar头像 name文本名称
   */
  type?: 'avatar' | 'name';

  /**
   * @param replace 如果暂无用户信息 则显示该自负
   */
  replace?: string;
};

/**
 * @name User 用户信息
 * @description Tooltip会显示用户名称、电话、部门等信息
 */
const User: React.FC<TypeUserTooltipProps> = ({ user, replace = '-', type = 'name' }) => {

  const title = <ul className={styles.user}>
    <li>姓名：{user?.name}</li>
    <li>联系电话：{user?.phone}</li>
    <li>所属部门：{user?.departments?.map(v => v.name).join('、') || '无'}</li>
  </ul>

  return (
    <Tooltip title={title} destroyTooltipOnHide={{ keepParent: false }}>
      {type === 'name' ? (user?.name || replace) : <Avatar size={40} src={user?.avatar || ICON_DEFAULT} />}
    </Tooltip>
  );
};

export default User;
