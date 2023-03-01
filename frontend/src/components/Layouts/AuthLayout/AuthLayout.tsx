import { Card, Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './AuthLayout.module.css';

const AuthLayout: FC = () => {
  return (
    <Layout className={classes.root}>
      <Card bordered={false} className={classes.card}>
        <Outlet />
      </Card>
    </Layout>
  );
};

export default AuthLayout;
