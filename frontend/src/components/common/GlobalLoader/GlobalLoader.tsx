import { FC } from 'react';
import { Layout, Spin } from 'antd';

import classes from './GlobalLoader.module.css';

const GlobalLoader: FC = () => {
  return (
    <Layout className={classes.root}>
      <Spin size='large' />
    </Layout>
  );
};

export default GlobalLoader;
