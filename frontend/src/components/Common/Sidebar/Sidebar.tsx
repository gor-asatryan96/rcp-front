import { Layout } from 'antd';
import { FC } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from '../../../helpers/hooks.helpers';
import NrgLogo from '../NrgLogo/NrgLogo';
import Menu from '../Menu/Menu';

import classes from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const isMobile = useIsMobile();

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
      <Menu />
    </Layout.Sider>
  );
};

export default Sidebar;
