import { Navigate } from 'react-router-dom';
import {
  AimOutlined,
  GifOutlined,
  HomeOutlined,
  QqOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import AuthLayout from '../Layouts/AuthLayout/AuthLayout';

import ChangePassword from './ChangePassword/ChangePassword';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import { IMenuAclKey, IMenuPath, IMenuRoute } from './routes.types';
import Home from './Home/Home';
import { PasswordChangeNeedRestrict } from './routes.restricts';
import CasinoReports from './Reports/CasinoReports/CasinoReports';
import SportReports from './Reports/SportReports/SportReports';

import type { RouteObject } from 'react-router-dom';

export const LOGOUT_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/login' />,
      },
      {
        path: '/login',
        element: (
          <PasswordChangeNeedRestrict isPasswordPage={false}>
            <Login />
          </PasswordChangeNeedRestrict>
        ),
      },
      {
        path: '/change-password',
        element: (
          <PasswordChangeNeedRestrict isPasswordPage>
            <ChangePassword />
          </PasswordChangeNeedRestrict>
        ),
      },
      {
        path: '*',
        element: <Navigate to='/login' />,
      },
    ],
  },
];

export const MENU_ROUTES: IMenuRoute[] = [
  {
    path: IMenuPath.home,
    icon: <HomeOutlined />,
    label: 'Home',
    element: <Home />,
  },
  {
    aclKey: IMenuAclKey.reports,
    icon: <GifOutlined />,
    label: 'Reports',
    children: [
      {
        path: IMenuPath.reports_sports,
        aclKey: IMenuAclKey.reports_sports,
        icon: <QqOutlined />,
        label: 'Sport',
        element: <SportReports />,
      },
      {
        path: IMenuPath.reports_casino,
        aclKey: IMenuAclKey.reports_casino,
        icon: <AimOutlined />,
        label: 'Casino',
        element: <CasinoReports />,
      },
    ],
  },
  {
    aclKey: IMenuAclKey.settings,
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        path: IMenuPath.setting_account,
        aclKey: IMenuAclKey.setting_account,
        icon: <UserOutlined />,
        label: 'Account',
        element: <Settings />,
      },
    ],
  },
];
