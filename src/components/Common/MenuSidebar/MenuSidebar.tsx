import { FC } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import { selectIsMenuSidebarOpen } from '../../../redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from '../../../helpers/hooks.helpers';
import Menu from '../Menu/Menu';

import classes from './MenuSidebar.module.scss';
import MenuSidebarHeader from './components/MenuSidebarHeader/MenuSidebarHeader';

const MenuSidebar: FC = () => {
  const isSidebarOpen = useSelector(selectIsMenuSidebarOpen);
  const isMobile = useIsMobile();

  return (
    <Layout.Sider
      className={classes.sidebar}
      trigger={null}
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      width={isMobile ? '100%' : 200}
      collapsed={!isSidebarOpen}>
      <div className={classes.sidebarContent}>
        <MenuSidebarHeader />
        <div className={classes.sidebarMenu}>
          <Menu />
        </div>
      </div>
    </Layout.Sider>
  );
};

export default MenuSidebar;
