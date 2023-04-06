import { FC } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectIsMenuSidebarOpen } from 'redux/reducers/appConfigs/appConfigs.slice';
import Header from 'components/Common/Header/Header';
import MenuSidebar from 'components/Common/MenuSidebar/MenuSidebar';
import Content from 'components/Common/Content/Content';
import NotificationSidebar from 'components/Common/NotificationSidebar/NotificationSidebar';

import classes from './DashboardLayout.module.scss';

const DashboardLayout: FC = () => {
  const isSidebarOpen = useSelector(selectIsMenuSidebarOpen);

  return (
    <Layout className={classes.root}>
      <MenuSidebar />
      <Layout
        className={classNames(classes.rightSide, 'transition', {
          [classes.open]: isSidebarOpen,
        })}>
        <Header />
        <Content />
      </Layout>
      <NotificationSidebar />
    </Layout>
  );
};

export default DashboardLayout;
