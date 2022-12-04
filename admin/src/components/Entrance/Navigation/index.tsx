import Logo from './Logo';
import { useMemo } from 'react';
import Icon from '@/layout/Icon';
import { Layout, Menu } from 'antd';
import styles from './index.module.sass';
import Router from '@/router/paths/private';
import { initMenu, getPathUrl } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';

import type { MenuProps } from 'antd/lib/menu';
import type { TypeRoute } from '@/interface/route';
import type { MenuInfo } from 'rc-menu/lib/interface';

interface NavigationProps {
  collapsed: boolean;
};

function filterMenu(list: TypeRoute.Route[]): MenuProps['items'] {
  return list.filter(v => !v.hide).map(v => {
    const key = v.id!;
    const label = <><Icon type={`icon-${key}`} /><span>{v.title}</span></>;
    return v.children?.length ? { key, label, children: filterMenu(v.children) } : { key, label };
  });
};

/**
 * @name Navigation 导航栏
 */
const Navigation: React.FC<NavigationProps> = ({ collapsed }) => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const openKeys = initMenu(pathname);

  function onClick(e: MenuInfo) {
    const path = getPathUrl(e.keyPath);
    navigate(path);
  };

  const items = useMemo(() => filterMenu(Router), []);

  const MenuConfig = {
    items,
    onClick,
    mode: "inline",
    theme: "light",
    selectedKeys: openKeys,
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
