import { INotificationListResponse } from 'services/notification';

export interface INotificationsSlice extends INotificationListResponse {
  isLoading: boolean;
}
