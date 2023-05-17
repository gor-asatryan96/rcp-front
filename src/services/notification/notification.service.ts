import axios from 'axios';

import {
  INotificationListRequestBody,
  INotificationListResponse,
  INotificationSeenRequestBody,
} from './notification.service.types';

export const NotificationService = {
  async getList(data: INotificationListRequestBody) {
    const response = await axios.post<INotificationListResponse>(
      '/notification/list',
      data,
    );
    return response.data;
  },
  async seen(data: INotificationSeenRequestBody) {
    const response = await axios.post<null>('/notification/seen', data);
    return response.data;
  },
};
