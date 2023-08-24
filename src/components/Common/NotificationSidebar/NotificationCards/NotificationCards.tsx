import { FC, useCallback, useEffect } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';

import {
  selectNotificationActiveTab,
  selectNotificationLimit,
  selectNotificationPage,
  selectIsNotificationsLoading,
  selectNotificationsCount,
  selectNotificationsList,
  setNotificationPage,
} from 'redux/reducers/notifications/notifications.slice';
import { INotification } from 'services/notification';
import {
  getNotificationsListThunk,
  seenNotificationThunk,
} from 'redux/reducers/notifications/notifications.thunks';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { useGetProjects } from 'components/App/app.hooks';

import { useNotificationsSideEffects } from '../Notifications/notifications.hooks';

import classes from './NotificationCards.module.scss';
import NotificationSpinner from './components/NotificationSpinner/NotificationSpinner';
import Notification from './components/Notification/Notification';

const NotificationCards: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const notificationsList = useSelector(selectNotificationsList);
  const notificationsCount = useSelector(selectNotificationsCount);
  const activeTab = useSelector(selectNotificationActiveTab);
  const page = useSelector(selectNotificationPage);
  const limit = useSelector(selectNotificationLimit);
  const isLoading = useSelector(selectIsNotificationsLoading);
  const hasMore = notificationsCount > notificationsList.length;

  useNotificationsSideEffects();
  useGetProjects();

  const nextPageAction = useCallback(() => {
    dispatch(setNotificationPage(page + 1));
  }, [page]);

  useEffect(() => {
    dispatch(
      getNotificationsListThunk({
        page,
        limit,
        seen: activeTab === 'All' ? undefined : activeTab === 'Seen',
      }),
    );
  }, [activeTab, page, limit]);

  const onCollaps = (isOpen: boolean, not: INotification) => {
    if (!isOpen || not.seen) return;
    dispatch(seenNotificationThunk({ notificationId: not.id }));
  };

  return (
    <div className={classes.cardsBody}>
      <InfiniteScroll
        hasMore={hasMore}
        height='100%'
        loader={<NotificationSpinner />}
        next={nextPageAction}
        dataLength={notificationsCount}>
        {isLoading && <NotificationSpinner />}
        {!isLoading &&
          (notificationsList.length ? (
            notificationsList.map((not: INotification) => (
              <Notification not={not} key={not.id} onCollaps={onCollaps} />
            ))
          ) : (
            <Card className={classes.collapse}>
              <p className={classes.emptyNotification}>
                {t("You don't have notifications yet")}
              </p>
            </Card>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default NotificationCards;
