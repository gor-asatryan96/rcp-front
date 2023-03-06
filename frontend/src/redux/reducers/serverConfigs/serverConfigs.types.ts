import { IMenuAclKey } from 'components/Routes/routes.types';

export type UserToken = string;

export type IAcl = IMenuAclKey[];

export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  userId: string;
  token: UserToken;
  acl: IAcl;
  isPasswordChangeNeed: boolean;
}

export interface ILoginForm {
  username: string;
  password: string;
  secretToken?: string;
  isRemember: boolean;
}
