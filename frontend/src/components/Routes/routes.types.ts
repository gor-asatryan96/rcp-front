import { MenuProps } from 'antd';
import { ReactNode } from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

export enum IMenuServerKey {
  // ADD YOUR PROJECT SERVER KEYS HERE
  home = 'home',
  settings = 'settings',
  setting_user = 'settings_account',
}

export enum IMenuPath {
  // ADD YOUR PROJECT PATHS HERE
  home = '/',
  settings = '/settings',
  setting_user = '/settings/account',
}

export interface IMenuRoute {
  serverKey: IMenuServerKey;
  path: IMenuPath;
  icon?: ReactNode;
  label: string;
  isProtected?: boolean;
  element: ReactNode;
  children?: IMenuRoute[];
}
