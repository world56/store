import { Layout } from 'antd';
import styles from './index.styl';
import { useActions } from '@/hooks';
import UserHandler from './UserHandler';
import { MenuFoldOutlined } from '@ant-design/icons';

interface HeaderProps {
  collapsed: boolean;
};

/**
 * @name Header system header
 */
const Header: React.FC<HeaderProps> = ({
  collapsed
}) => {

  const actions = useActions();

  return (
    <Layout.Header className={styles.layout}>
      <MenuFoldOutlined
        onClick={actions.setNavCollapsed}
        className={collapsed ? styles.close : ''}
        title={`点击${collapsed ? '展开' : '收起'}导航栏`} />
      <UserHandler />
    </Layout.Header>
  );
};

export default Header;
