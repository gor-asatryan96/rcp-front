import { MenuProps } from 'antd';
import { ReactNode } from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

export enum IAclPath {
  // ADD YOUR PROJECT ACL PATHS HERE
  home = 'home',
  settings = 'settings',
  setting_account = 'settings.account',
  reports = 'reports',
  reports_sports = 'reports.sports',
  reports_casino = 'reports.casino',
}

export enum IRoutePath {
  // ADD YOUR PROJECT PATHS HERE
  home = '/',
  reports_sports = '/reports/sports',
  reports_casino = '/reports/casino',
  setting_account = '/setting/account',
}

export interface IMenuRoute {
  aclPath?: IAclPath; // protected if exist
  path?: IRoutePath;
  icon?: ReactNode;
  label?: string;
  element?: ReactNode;
  children?: IMenuRoute[];
}
