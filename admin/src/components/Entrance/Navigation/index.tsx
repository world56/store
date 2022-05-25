import Logo from './Logo';
import { useMemo } from 'react';
import Icon from '@/layout/Icon';
import { Layout, Menu } from 'antd';
import styles from './index.module.sass';
import Router from '@/router/paths/private';
import { getPathUrl, initMenu } from '../utils';
import { useLocation, useHistory } from 'react-router-dom';

import type { MenuProps } from 'antd/lib/menu';
import type { TypeRoute } from '@/interface/route';
import type { MenuInfo } from 'rc-menu/lib/interface';

interface NavigationProps {
  collapsed: boolean;
}

function filterMenu(list: TypeRoute.RouteParamType[]): MenuProps['items'] {
  return list.map(v => {
    const { name: key } = v;
    const label = <><Icon type={`icon-${key}`} /><span>{v.title}</span></>;
    return v.routes?.length ? { key, label, children: filterMenu(v.routes) } : { key, label }
  });
}

/**
 * @name Navigation 导航栏
 */
const Navigation: React.FC<NavigationProps> = ({
  collapsed
}) => {

  const navigate = useHistory();
  const { pathname } = useLocation();

  const openKeys = initMenu(pathname);

  function onClick(e: MenuInfo) {
    navigate.push(getPathUrl(e.keyPath));
  };

  const items = useMemo(() => filterMenu(Router), []);

  const MenuConfig = {
    items,
    onClick,
    mode: "inline",
    theme: "light",
    key: collapsed,
    defaultSelectedKeys: openKeys,
    defaultOpenKeys: collapsed ? [] : openKeys,
  } as MenuProps;

  return (
    <Layout.Sider
      width={280}
      theme='light'
      collapsed={collapsed}
      className={styles.layout}>
      <Logo collapsed={collapsed} />
      <Menu {...MenuConfig} />
    </Layout.Sider>
  );
};

export default Navigation;
