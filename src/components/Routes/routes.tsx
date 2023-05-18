import { Navigate } from 'react-router-dom';
import {
  CalendarOutlined,
  DeploymentUnitOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import AuthLayout from '../Layouts/AuthLayout/AuthLayout';
import i18n from '../../assets/translations';

import ChangePassword from './ChangePassword/ChangePassword';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import { IAclPath, IRoutePath, IMenuRoute } from './routes.types';
import Home from './Home/Home';
import { PasswordChangeNeedRestrict } from './routes.restricts';
import UsersForAdmin from './AdminPanel/UsersForAdmin/UsersForAdmin';
import General from './Limits/General/General';

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
        path: '/create-password',
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
    path: IRoutePath.home,
    icon: <HomeOutlined />,
    label: i18n.t('Home'),
    element: <Home />,
  },
  {
    icon: <CalendarOutlined />,
    label: i18n.t('Limits'),
    children: [
      {
        path: IRoutePath.limits_daily,
        icon: <CalendarOutlined />,
        label: i18n.t('General'),
        element: <General />,
      },
    ],
  },
  {
    // aclPath: IAclPath.admin,
    icon: <DeploymentUnitOutlined />,
    label: i18n.t('Admin Panel'),
    children: [
      {
        aclPath: IAclPath.admin_users_list,
        path: IRoutePath.admin_for_users,
        icon: <TeamOutlined />,
        label: i18n.t('Users'),
        element: <UsersForAdmin />,
      },
    ],
  },
  {
    icon: <SettingOutlined />,
    label: i18n.t('Settings'),
    children: [
      {
        path: IRoutePath.setting_account,
        icon: <UserOutlined />,
        label: i18n.t('Account'),
        element: <Settings />,
      },
    ],
  },
];
