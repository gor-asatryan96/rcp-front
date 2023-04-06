import { Layout } from 'antd';
import { FC } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import {
  selectIsMenuSidebarOpen,
  toggleMenuSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from '../../../helpers/hooks.helpers';
import NrgLogo from '../NrgLogo/NrgLogo';
import Menu from '../Menu/Menu';

import classes from './MenuSidebar.module.scss';

const MenuSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useSelector(selectIsMenuSidebarOpen);
  const isMobile = useIsMobile();

  const closeBurger = () => {
    dispatch(toggleMenuSidebar(false));
  };

  return (
    <Layout.Sider
      className={classes.sidebar}
      trigger={null}
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      width={isMobile ? '100%' : 200}
      collapsed={!isSidebarOpen}>
      <div className={classes.sidebarContent}>
        <div className={classes.sidebarHeader}>
          <NrgLogo />
          {isMobile && (
            <div className={classes.closeIconWrapper}>
              <MenuFoldOutlined
                onClick={closeBurger}
                className={classes.closeIcon}
              />
            </div>
          )}
        </div>
        <div className={classes.sidebarMenu}>
          <Menu />
        </div>
      </div>
    </Layout.Sider>
  );
};

export default MenuSidebar;
