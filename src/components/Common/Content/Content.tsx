import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './Content.module.scss';

// import Navigation from '../Navigation/Navigation';

const Content: FC = () => {
  return (
    <Layout.Content className={classes.root}>
      {/* <Navigation /> */}
      <Outlet />
    </Layout.Content>
  );
};

export default Content;
