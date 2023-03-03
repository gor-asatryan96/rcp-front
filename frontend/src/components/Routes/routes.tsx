import { Navigate } from 'react-router-dom';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import AuthLayout from '../Layouts/AuthLayout/AuthLayout';

import ChangePassword from './ChangePassword/ChangePassword';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import { IMenuServerKey, IMenuPath, IMenuRoute } from './routes.types';
import Home from './Home/Home';

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
        element: <Login />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
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
    serverKey: IMenuServerKey.home,
    isProtected: false,
    element: <Home />,
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    path: IMenuPath.settings,
    serverKey: IMenuServerKey.settings,
    isProtected: false,
    element: <Settings />,
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        path: IMenuPath.setting_user,
        serverKey: IMenuServerKey.setting_user,
        element: <Settings />,
        icon: <UserOutlined />,
        label: 'Account',
      },
    ],
  },
];
