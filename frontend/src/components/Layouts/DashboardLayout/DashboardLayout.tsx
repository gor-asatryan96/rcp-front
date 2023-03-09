import { FC } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectIsSidebarOpen } from 'redux/reducers/appConfigs/appConfigs.slice';

import Header from '../../Common/Header/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Content from '../../Common/Content/Content';

import classes from './DashboardLayout.module.scss';

const DashboardLayout: FC = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <Layout className={classes.root}>
      <Sidebar />
      <Layout
        className={classNames(classes.rightSide, 'transition', {
          [classes.open]: isSidebarOpen,
        })}>
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
