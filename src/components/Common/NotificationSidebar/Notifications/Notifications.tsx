import { FC } from 'react';

import NotificationTabs from '../NotificationTabs/NotificationTabs';
import NotificationCards from '../NotificationCards/NotificationCards';

import classes from './Notifications.module.scss';

const Notifications: FC = () => {
  return (
    <div className={classes.notificationsBody}>
      <NotificationTabs />
      <NotificationCards />
    </div>
  );
};

export default Notifications;
