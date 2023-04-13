import axios from 'axios';

import {
  INotificationListRequestBody,
  INotificationListResponse,
} from './notification.service.types';

export const NotificationService = {
  async getList(data: INotificationListRequestBody) {
    const response = await axios.post<INotificationListResponse>(
      '/notification/list',
      data,
    );
    return response.data;
  },
};
