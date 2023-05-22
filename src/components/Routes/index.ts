import { LOGOUT_ROUTES, MENU_ROUTES } from './routes';
import {
  createLoginRoutes,
  createValidMenuRoutes,
  filterRoutesByAcl,
} from './routes.helpers';

import type { IAcl } from 'redux/reducers/serverConfigs/serverConfigs.types';
import type { RouteObject } from 'react-router-dom';

export const getValidMenuItems = (acl: IAcl, isCountryChoosen: boolean) => {
  return createValidMenuRoutes(
    filterRoutesByAcl(acl, MENU_ROUTES, isCountryChoosen),
  );
};

export const getValidRoutes = (
  isAuth: boolean,
  acl: IAcl,
  isProjectChoosen: boolean,
): RouteObject[] => {
  if (!isAuth) return LOGOUT_ROUTES;
  return createLoginRoutes(acl, isProjectChoosen);
};
