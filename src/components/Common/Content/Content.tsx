import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './Content.module.scss';

const Content: FC = () => {
  return (
    <Layout.Content className={classes.root}>
      <Outlet />
    </Layout.Content>
  );
};

export default Content;
