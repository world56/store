import Logo from './Logo';
import Icon from '@/layout/Icon';
import styles from './index.styl';
import { Layout, Menu } from 'antd';
import Router from '@/router/paths/private';
import { getPathUrl, initMenu } from '../utils';
import { useLocation, useHistory } from 'react-router-dom';

import type { MenuProps } from 'antd/lib/menu';
import type { MenuInfo } from 'rc-menu/lib/interface';

interface NavigationProps {
  collapsed: boolean;
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

  const MenuConfig = {
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
      <Menu {...MenuConfig}>
        {Router.map(v => v.routes?.length ? <Menu.SubMenu key={v.name} title={
          <><Icon type={`icon-${v.name}`} /><span>{v.title}</span></>}>
          {v.routes.map(val => !val.routes ? !val.hidden ? <Menu.Item key={val.name}>
            <><Icon type={`icon-${val.name}`} /><span>{val.title}</span></></Menu.Item> : null :
            <Menu.SubMenu key={val.name} title={<><Icon type={`icon-${val.name}`} /><span>{val.title}</span></>}>
              {val.routes.map(value => <Menu.Item key={value.name}><Icon type={`icon-${value.name}`} /><span>{value.title}</span></Menu.Item>)}
            </Menu.SubMenu>)}
        </Menu.SubMenu> : <Menu.Item key={v.name} title={v.name}><Icon type={`icon-${v.name}`} /><span>{v.title}</span></Menu.Item>)}
      </Menu>
    </Layout.Sider>
  );
};

export default Navigation;
