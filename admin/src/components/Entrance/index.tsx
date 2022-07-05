import { Layout } from 'antd';
import Header from './Header';
import { useStore } from '@/hooks';
import Navigation from './Navigation';
import styles from './index.module.sass';
import { Middleware as RouteMiddleware } from '@/router';

import type { TypeRoute } from '@/interface/route';

/**
 * @name MainEntrance 系统主入口
 */
const MainEntrance: React.FC<TypeRoute.InitRoutePropsType> = ({
  routes
}) => {

  const { system } = useStore();

  return (
    <Layout>
      <Navigation collapsed={system.collapsed} />
      <Layout>
        <Header collapsed={system.collapsed} />
        <Layout.Content className={styles.content}>
          <RouteMiddleware routes={routes} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainEntrance;
