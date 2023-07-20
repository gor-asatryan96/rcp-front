import { IAclPath } from 'components/Routes/routes.types';

import { ICountry } from '../projects/projects.types';

export type UserToken = string;
export type IAcl = IAclPath[];
export type TLocal = 'EN';
export type TRole = 'SUPER_ADMIN' | 'USER';

export interface IUser {
  id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  phone: number;
  token: UserToken;
  acl: IAcl;
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
  meta: IMeta;
  ws_token: string;
}

export interface IMeta {
  last_action_at: string;
  currentProject: ICountry;
}
export interface IServerConfigs {
  isConnected: boolean;
  isLoading: boolean;
  isProfileChangeLoading: boolean;
  isNewProfile: boolean;
  user: IUser;
}

export interface ILoginForm {
  lastName: string;
  firstName: string;
  password: string;
  tft?: string;
  isRemember?: boolean;
}

export interface ICreatePassword {
  oldPassword?: string;
  username?: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  tft?: string;
}
