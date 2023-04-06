import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './AuthLayout.module.scss';

const AuthLayout: FC = () => {
  return (
    <Layout className={classes.root}>
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;
