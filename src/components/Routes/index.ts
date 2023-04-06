import { LOGOUT_ROUTES, MENU_ROUTES } from './routes';
import {
  createLoginRoutes,
  createValidMenuRoutes,
  filterRoutesByAcl,
} from './routes.helpers';

import type { IAcl } from 'redux/reducers/serverConfigs/serverConfigs.types';
import type { RouteObject } from 'react-router-dom';

export const getValidMenuItems = (acl: IAcl) => {
  return createValidMenuRoutes(filterRoutesByAcl(acl, MENU_ROUTES));
};

export const getValidRoutes = (isAuth: boolean, acl: IAcl): RouteObject[] => {
  if (!isAuth) return LOGOUT_ROUTES;
  return createLoginRoutes(acl);
};
