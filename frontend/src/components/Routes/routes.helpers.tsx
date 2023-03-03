import { Navigate, RouteObject } from 'react-router-dom';

import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout';

import { IMenuRoute, MenuItem } from './routes.types';
import { MENU_ROUTES } from './routes';

import type { IAcl } from 'redux/reducers/serverConfigs/serverConfigs.types';

export const filterMenuRoutesByAcl = (acl: IAcl) => {
  return MENU_ROUTES.filter(
    route => !route.isProtected || acl[route.serverKey] > 0,
  );
};

export const createValidMenuRoutes = (routes: IMenuRoute[]): MenuItem[] => {
  if (!routes) return [];
  return routes.map(route => ({
    label: route.label,
    icon: route.icon,
    key: route.path,
    children: route.children
      ? createValidMenuRoutes(route.children)
      : undefined,
  }));
};

export const createValidRoutesFromMenuItems = (
  routes: IMenuRoute[],
): RouteObject[] => {
  if (!routes) return [];
  return routes.map(route => ({
    path: route.path,
    element: route.element,
    children: route.children
      ? createValidRoutesFromMenuItems(route.children)
      : undefined,
  }));
};

export const createLoginRoutes = (acl: IAcl): RouteObject[] => {
  const menuValidRoutes: RouteObject[] = createValidRoutesFromMenuItems(
    filterMenuRoutesByAcl(acl),
  );

  return [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        ...menuValidRoutes,
        {
          path: '*',
          element: <Navigate to='/' />,
        },
      ],
    },
  ];
};
