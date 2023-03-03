import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

// import Navigation from '../Navigation/Navigation';

const Content: FC = () => {
  return (
    <Layout.Content style={{ margin: '0 16px' }}>
      {/* <Navigation /> */}
      <Outlet />
    </Layout.Content>
  );
};

export default Content;
