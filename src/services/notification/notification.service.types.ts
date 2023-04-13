export type TNotificationKind = 'USER' | 'SYSTEM' | 'ROLE';

export interface INotification {
  id: number;
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

export interface INotificationListResponse {
  list: INotification[];
  count: number;
  unseen_count: number;
}
