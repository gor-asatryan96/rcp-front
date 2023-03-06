export type UserToken = string;

export interface IAcl {
  [key: string]: number;
}

export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  userId: string;
  token: UserToken;
  acl: IAcl;
}

export interface ILoginForm {
  username: string;
  password: string;
  secretToken?: string;
  isRemember: boolean;
}
