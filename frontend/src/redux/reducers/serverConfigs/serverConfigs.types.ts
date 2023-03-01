export type UserToken = string;

export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  userId: string;
  token: UserToken;
}
