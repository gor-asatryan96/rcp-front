import { Centrifuge, PublicationContext } from 'centrifuge';

import { addNotification } from 'redux/reducers/notifications/notifications.slice';
import { store } from 'redux/store';

function subscribeToChannel(channel: string, centrifuge: Centrifuge) {
  const sub = centrifuge.newSubscription(channel);

  sub.on('publication', (res: PublicationContext) => {
    store.dispatch(addNotification(res.data));
  });

  sub.subscribe();
}

export const openNotificationSocket = async () => {
  try {
    const {
      id: userId,
      role,
      ws_token: token,
    } = store.getState().serverConfigs.user;
    const centrifuge = new Centrifuge(
      'ws://biko.energaming.systems:8118/connection/websocket',
      {
        token,
      },
    );

    subscribeToChannel(`notification#user#${userId}`, centrifuge);
    subscribeToChannel(`notification#role#${role}`, centrifuge);
    subscribeToChannel('notification#system', centrifuge);

    centrifuge.connect();
    return centrifuge;
  } catch (err) {
    /* ... */
  }
};
