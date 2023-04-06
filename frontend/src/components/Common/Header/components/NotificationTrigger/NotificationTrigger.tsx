import { BellFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import { FC } from 'react';

import classes from '../../Header.module.scss';

const NotificationTrigger: FC = () => {
  return (
    <div>
      <Badge size='small' count={5}>
        <BellFilled type='primary' className={classes.trigger} />
      </Badge>
    </div>
  );
};

export default NotificationTrigger;
