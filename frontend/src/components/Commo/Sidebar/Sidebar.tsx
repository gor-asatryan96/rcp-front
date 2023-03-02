import { Layout, Menu } from 'antd';
import { FC, Key, ReactNode } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import { logout } from '../../../redux/reducers/serverConfigs/serverConfigs.slice';
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from '../../../helpers/hooks.helpers';
import NrgLogo from '../NrgLogo/NrgLogo';

import classes from './Sidebar.module.scss';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const isMobile = useIsMobile();

  // TODO
  const menuItems: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '6'),
      getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
      onClick: () => dispatch(logout()),
    },
  ];

  const closeBurger = () => {
    dispatch(toggleSidebar(false));
  };

  return (
    <Layout.Sider
      className={classes.sidebar}
      trigger={null}
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      width={isMobile ? '100%' : 200}
      collapsed={!isSidebarOpen}>
      <div className={classes.sidebarHeader}>
        <NrgLogo />
        {isMobile && (
          <div className={classes.closeIconWrapper}>
            <MenuUnfoldOutlined
              onClick={closeBurger}
              className={classes.closeIcon}
            />
          </div>
        )}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
