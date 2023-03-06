import { Navigate, RouteObject } from 'react-router-dom';

import AuthLayout from '../Layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';

import ChangePassword from './ChangePassword/ChangePassword';
import Login from './Login/Login';
import Settings from './Settings/Settings';

const LOGOUT_ROUTES: RouteObject[] = [
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

export const MENU_ROUTES: RouteObject[] = [
  {
    path: 'settings',
    element: <Settings />,
  },
];

const LOGIN_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // ADD YOUR ADMIN PANEL ROUTES HERE
      ...MENU_ROUTES,
      {
        path: '*',
        element: <Navigate to='/' />,
      },
    ],
  },
];

export const getValidRoutes = (isAuth: boolean): RouteObject[] => {
  return isAuth ? LOGIN_ROUTES : LOGOUT_ROUTES;
};
