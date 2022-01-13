import Cookies from 'js-cookie';
import styles from './index.styl';
import { TOKEN_KEY } from '@/config/user';
import UserIcon from '@/resource/icon.jpg';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, message } from 'antd';
import { useStore, useActions } from '@/hooks';
import { SettingOutlined, LoginOutlined } from '@ant-design/icons';

import type { MenuInfo } from 'rc-menu/lib/interface';

/**
 * @name UserHandler 用户头像控制模块
 */
const UserHandler = () => {

  const { user } = useStore();
  const actions = useActions();
  const navigate = useHistory();

  function onClick({ key }: MenuInfo) {
    if (key === '2') {
      Cookies.remove(TOKEN_KEY);
      actions.delUserInfo();
      message.warn('退出成功');
      navigate.push('/user/login');
    }
  }

  const menu = (
    <Menu
      onClick={onClick}
      className={styles.userSelect}>
      <Menu.Item key='1'>
        <SettingOutlined />
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Item key='2' danger>
        <LoginOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.user}>
      <Dropdown overlay={menu}>
        <div>
          <img className={styles.icon} src={UserIcon} alt="#" />
          <span>{user.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserHandler;
