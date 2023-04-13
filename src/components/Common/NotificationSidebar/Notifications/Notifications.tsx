import { FC, useEffect } from 'react';

import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { getNotificationsListThunk } from 'redux/reducers/notifications/notifications.thunks';

import { useNotificationsSideEffects } from './notifications.hooks';

const Notifications: FC = () => {
  const dispatch = useAppDispatch();
  useNotificationsSideEffects();

  useEffect(() => {
    // TODO: add pagination
    dispatch(getNotificationsListThunk({ page: 1, limit: 10 }));
  }, []);

  return <div>Notifications</div>;
};

export default Notifications;
