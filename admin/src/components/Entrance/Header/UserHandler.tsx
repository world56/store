import styles from './index.styl';
import { Menu, Dropdown } from 'antd';
import UserIcon from '@/resource/userIcon.jpeg';
import { SettingOutlined, LoginOutlined } from '@ant-design/icons';

/**
 * @name UserHandler 用户头像控制模块
 */
const UserHandler = () => {

  const menu = (
    <Menu className={styles.userSelect}>
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
          <span>管理员</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserHandler;
