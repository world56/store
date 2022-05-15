import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from './index.styl';
import { TOKEN_KEY } from '@/config/user';
import UserIcon from '@/resource/icon.jpg';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, message } from 'antd';
import { useStore, useActions } from '@/hooks';
import EditUserInfo from '@/components/EditUserInfo';
import EditUserPassword from '@/components/EditUserInfo/EditUserPassword';
import { SettingOutlined, LoginOutlined, LockOutlined } from '@ant-design/icons';

import { ENUM_SYSTEM } from '@/enum/system';

import type { MenuInfo } from 'rc-menu/lib/interface';

const MENU_LIST = [
  {
    key: '1',
    label: <>
      <SettingOutlined />
      <span>个人信息</span>
    </>
  },
  {
    key: '2',
    label: <>
      <LockOutlined />
      <span>修改密码</span>
    </>,
  },
  {
    key: '0',
    danger: true,
    label: <>
      <LoginOutlined />
      <span>退出登录</span>
    </>
  }
];

/**
 * @name UserHandler 用户头像控制模块
 */
const UserHandler = () => {

  const { user } = useStore();
  const actions = useActions();
  const navigate = useHistory();

  const [editPwd, setEditPwd] = useState(false);
  const [editUserVis, setEditUserVis] = useState(false);

  function onClick({ key }: MenuInfo) {
    switch (key) {
      case '0':
        Cookies.remove(TOKEN_KEY);
        actions.delUserInfo();
        message.warn('退出成功');
        return navigate.push('/user/login');
      case '1':
        return setEditUserVis(true);
      case '2':
        return setEditPwd(true);
      default: return;
    }
  }

  return (
    <div className={styles.user}>
      <Dropdown overlay={
        <Menu onClick={onClick} className={styles.userSelect} items={MENU_LIST} />
      }>
        <div>
          <img className={styles.icon} src={user.avatar || UserIcon} alt="#" />
          <span>{user.name}</span>
        </div>
      </Dropdown>
      <EditUserInfo
        visible={editUserVis}
        onClose={() => setEditUserVis(false)}
        id={editUserVis ? user.id : undefined}
        type={ENUM_SYSTEM.EDIT_USER.PERSONAL} />
      <EditUserPassword visible={editPwd} onClose={() => setEditPwd(false)} />
    </div>
  );
};

export default UserHandler;
