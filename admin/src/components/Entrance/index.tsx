import { Layout } from 'antd';
import Header from './Header';
import { useStore } from '@/hooks';
import Navigation from './Navigation';
import { SYSTEM_NAV_STATUS_KEY } from '@/config/system';
import { Middleware as RouteMiddleware } from '@/router';

import type { TypeRoute } from '@/interface/route';

/**
 * @name MainEntrance 系统主入口
 */
const MainEntrance: React.FC<TypeRoute.InitRoutePropsType> = ({
  routes
}) => {

  const { system } = useStore();
  const collapsed = system[SYSTEM_NAV_STATUS_KEY];

  return (
    <Layout>
      <Navigation collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Layout.Content>
          <RouteMiddleware routes={routes} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainEntrance;
