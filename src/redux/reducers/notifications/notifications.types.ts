import { INotificationListResponse } from 'services/notification';

export interface INotificationsSlice extends INotificationListResponse {
  isLoading: boolean;
  activeTab: 'All' | 'Seen' | 'Unseen';
  page: number;
  limit: number;
}
