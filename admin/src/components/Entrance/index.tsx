import { Layout } from 'antd';
import Header from './Header';
import { useStore } from '@/hooks';
import Navigation from './Navigation';
import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';

/**
 * @name MainEntrance 系统主入口
 */
const MainEntrance = () => {

  const { system } = useStore();

  return (
    <Layout>
      <Navigation collapsed={system.collapsed} />
      <Layout>
        <Header collapsed={system.collapsed} />
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainEntrance;
