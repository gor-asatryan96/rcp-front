import { LOGOUT_ROUTES } from './routes';
import {
  createLoginRoutes,
  createValidMenuRoutes,
  filterMenuRoutesByAcl,
} from './routes.helpers';

import type { IAcl } from 'redux/reducers/serverConfigs/serverConfigs.types';
import type { RouteObject } from 'react-router-dom';

export const getValidMenuItems = (acl: IAcl) => {
  return createValidMenuRoutes(filterMenuRoutesByAcl(acl));
};

export const getValidRoutes = (isAuth: boolean, acl: IAcl): RouteObject[] => {
  if (!isAuth) return LOGOUT_ROUTES;
  return createLoginRoutes(acl);
};
