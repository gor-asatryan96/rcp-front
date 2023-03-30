import { IAclPath } from 'components/Routes/routes.types';

export type UserToken = string;
export type IAcl = IAclPath[];
export type TLocal = 'EN';
export type TRole = 'SUPER_ADMIN' | 'USER';

export interface IUser {
  id: number | null;
  username: string;
  token: UserToken;
  acl: IAcl;
  isPasswordChangeRequired: boolean;
  email: string;
  is_active: 0 | 1;
  is_sp_reset: 0 | 1;
  is_twofa_enabled: 0 | 1;
  locale: TLocal;
  role: TRole;
  timezone: string;
  created_at: string;
  updated_at: string;
  sp_updated_at: string;
}

export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  user: IUser;
}

export interface ILoginForm {
  username: string;
  password: string;
  secretToken?: string;
  isRemember: boolean;
}
