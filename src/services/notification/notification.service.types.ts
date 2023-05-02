export type TNotificationKind = 'USER' | 'SYSTEM' | 'ROLE';
export type INotificationId = number;

export interface INotification {
  id: INotificationId;
  kind: TNotificationKind;
  body: string;
  sender: string;
  type: string;
  seen: 0 | 1;
  received_at: string;
  seen_at: string | null;
}

export interface INotificationListRequestBody {
  limit: number;
  page: number;
  seen?: boolean;
}

export interface INotificationSeenRequestBody {
  notificationId: INotificationId;
}

export interface INotificationListResponse {
  list: INotification[];
  count: number;
  unseen_count: number;
}
