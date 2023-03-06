import { MenuProps } from 'antd';
import { ReactNode } from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

export enum IMenuAclKey {
  // ADD YOUR PROJECT ACL KEYS HERE
  home = 'home',
  settings = 'settings',
  setting_account = 'settings.account',
  reports = 'reports',
  reports_sports = 'reports.sports',
  reports_casino = 'reports.casino',
}

export enum IMenuPath {
  // ADD YOUR PROJECT PATHS HERE
  home = '/',
  reports_sports = '/reports/sports',
  reports_casino = '/reports/casino',
  setting_account = '/setting/account',
}

export interface IMenuRoute {
  aclKey?: IMenuAclKey; // protected if exist
  path?: IMenuPath;
  icon?: ReactNode;
  label?: string;
  element?: ReactNode;
  children?: IMenuRoute[];
}
