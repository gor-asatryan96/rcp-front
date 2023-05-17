import { BellFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import { FC } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { toggleNotificationSidebar } from 'redux/reducers/appConfigs/appConfigs.slice';
import { selectUnseenNotificationsCount } from 'redux/reducers/notifications/notifications.slice';

import classes from './NotificationTrigger.module.scss';

type PropTypes = {
  isInSidebar: boolean;
};

const NotificationTrigger: FC<PropTypes> = ({ isInSidebar = false }) => {
  const dispatch = useAppDispatch();
  const unseenNotificationsCount = useSelector(selectUnseenNotificationsCount);

  const openNotificationSidebar = () => {
    dispatch(toggleNotificationSidebar(true));
  };

  return (
    <div
      onClick={openNotificationSidebar}
      onKeyDown={openNotificationSidebar}
      role='button'
      tabIndex={0}
      className={classNames(classes.root, {
        [classes.sidebar]: isInSidebar,
      })}>
      <Badge dot={!!unseenNotificationsCount}>
        <BellFilled type='primary' className={classes.trigger} />
      </Badge>
    </div>
  );
};

export default NotificationTrigger;
