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

  const menu = (
    <Menu onClick={onClick} className={styles.userSelect}>
      <Menu.Item key='1'>
        <SettingOutlined />
        <span>个人信息</span>
      </Menu.Item>
      <Menu.Item key='2'>
        <LockOutlined />
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Item key='0' danger>
        <LoginOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.user}>
      <Dropdown overlay={menu}>
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
