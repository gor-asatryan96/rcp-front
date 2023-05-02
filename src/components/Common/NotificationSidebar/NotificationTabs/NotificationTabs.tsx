import { FC } from 'react';
import { Badge, Segmented } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  setActiveTab,
  selectNotificationActiveTab,
  selectUnseenNotificationsCount,
} from 'redux/reducers/notifications/notifications.slice';

import classes from './NotificationTabs.module.scss';

const NotificationTabs: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const unseenCount = useSelector(selectUnseenNotificationsCount);
  const activeTab = useSelector(selectNotificationActiveTab);

  return (
    <Segmented
      className={classes.notificationTabsBody}
      value={activeTab}
      onChange={key => dispatch(setActiveTab(key))}
      block
      size='large'
      options={[
        {
          value: 'All',
          label: t('All'),
        },
        {
          label: (
            <Badge
              count={unseenCount}
              color={unseenCount ? 'red' : 'gray'}
              showZero
              offset={[12, -1]}>
              {t('Unseen')}
            </Badge>
          ),
          value: 'Unseen',
        },
        {
          value: 'Seen',
          label: t('Seen'),
        },
      ]}
    />
  );
};

export default NotificationTabs;
