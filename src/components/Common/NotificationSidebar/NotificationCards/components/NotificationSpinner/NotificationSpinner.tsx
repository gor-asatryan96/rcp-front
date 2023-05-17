import { FC } from 'react';
import { Spin } from 'antd';

import classes from './NotificationSpinner.module.scss';

const NotificationSpinner: FC = () => {
  return (
    <div className={classes.spin}>
      <Spin size='small' />
    </div>
  );
};

export default NotificationSpinner;
