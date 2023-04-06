import { BellFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import { FC } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { toggleNotificationSidebar } from 'redux/reducers/appConfigs/appConfigs.slice';

import classes from './NotificationTrigger.module.scss';

type PropTypes = {
  isHeader: boolean;
};

const NotificationTrigger: FC<PropTypes> = ({ isHeader = false }) => {
  const dispatch = useAppDispatch();

  const openNotificationSidebar = () => {
    dispatch(toggleNotificationSidebar(true));
  };

  return (
    <div
      className={classNames(classes.root, {
        [classes.headerTrigger]: isHeader,
      })}>
      <Badge size='small' count={5}>
        <BellFilled
          type='primary'
          className={classes.trigger}
          onClick={openNotificationSidebar}
        />
      </Badge>
    </div>
  );
};

export default NotificationTrigger;
