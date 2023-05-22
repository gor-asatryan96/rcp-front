import { Navigate, RouteObject } from 'react-router-dom';

import DashboardLayout from 'components/Layouts/DashboardLayout/DashboardLayout';

import { IMenuRoute, MenuItem } from './routes.types';
import { MENU_ROUTES } from './routes';

import type { IAcl } from 'redux/reducers/serverConfigs/serverConfigs.types';

export const filterRoutesByAcl = (
  acl: IAcl,
  routeList: IMenuRoute[],
  isProjectChoosen: boolean,
): IMenuRoute[] => {
  const routes: IMenuRoute[] = [];
  routeList.forEach(route => {
    const isHasAccess =
      (!route.isProjectRequired || isProjectChoosen) &&
      (!route.aclPath || acl.includes(route.aclPath));

    if (isHasAccess) {
      routes.push({
        ...route,
        children: route.children
          ? filterRoutesByAcl(acl, route.children, isProjectChoosen)
          : undefined,
      });
    }
  });
  return routes;
};

export const createValidRoutesTree = (
  routeList: IMenuRoute[],
): IMenuRoute[] => {
  const routes: IMenuRoute[] = [];
  routeList.forEach(route => {
    if (route.children) {
      routes.push(...createValidRoutesTree(route.children));
    } else {
      routes.push({
        path: route.path,
        element: route.element,
      });
    }
  });
  return routes;
};

export const createValidMenuRoutes = (routes: IMenuRoute[]): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  if (routes) {
    routes.forEach(route => {
      const currentMenu: MenuItem = {
        label: route.label || '',
        icon: route.icon || '',
        key: route.path || route.label || '',
      };

      if (route.children) {
        const childrenRoutes: MenuItem[] = createValidMenuRoutes(
          route.children,
        );
        if (childrenRoutes.length) {
          menuItems.push({ ...currentMenu, children: childrenRoutes });
        }
      } else {
        menuItems.push(currentMenu);
      }
    });
  }
  return menuItems;
};

export const createLoginRoutes = (
  acl: IAcl,
  isProjectChoosen: boolean,
): RouteObject[] => {
  const menuValidRoutes: RouteObject[] = createValidRoutesTree(
    filterRoutesByAcl(acl, MENU_ROUTES, isProjectChoosen),
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
