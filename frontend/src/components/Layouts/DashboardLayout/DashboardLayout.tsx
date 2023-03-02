import { FC } from 'react';
import { Layout } from 'antd';

import Header from '../../Common/Header/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Content from '../../Common/Content/Content';

const DashboardLayout: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className='site-layout'>
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
