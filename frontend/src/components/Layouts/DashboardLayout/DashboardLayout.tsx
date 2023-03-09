import { FC } from 'react';
import { Layout } from 'antd';

import Header from '../../Common/Header/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Content from '../../Common/Content/Content';

import classes from './DashboardLayout.module.scss';

const DashboardLayout: FC = () => {
  return (
    <Layout className={classes.root}>
      <Sidebar />
      <Layout className='site-layout'>
        <Header />
        <div className={classes.contentWrapper}>
          <Content />
        </div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
