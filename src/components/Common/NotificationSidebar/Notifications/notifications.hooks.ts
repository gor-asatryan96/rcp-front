import { Centrifuge } from 'centrifuge';
import { useEffect } from 'react';

import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { resetNotifications } from 'redux/reducers/notifications/notifications.slice';
import { openNotificationSocket } from 'services/notification';

export const useNotificationSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let notificationSocket: Centrifuge | undefined;
    (async () => {
      notificationSocket = await openNotificationSocket();
    })();

    return () => {
      notificationSocket?.disconnect();
      dispatch(resetNotifications());
    };
  }, []);
};

export const useNotificationsSideEffects = () => {
  useNotificationSocket();
};
