export type UserToken = string;

export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  userId: string;
  token: UserToken;
}

export interface ILoginForm {
  username: string;
  password: string;
  secretToken?: string;
  isRemember: boolean;
}
