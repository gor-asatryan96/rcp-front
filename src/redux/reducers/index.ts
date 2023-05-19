import { combineReducers } from '@reduxjs/toolkit';

import countries from './countries/countries.slice';
import serverConfigs from './serverConfigs/serverConfigs.slice';
import appConfigs from './appConfigs/appConfigs.slice';
import notifications from './notifications/notifications.slice';

export const reducers = combineReducers({
  serverConfigs,
  appConfigs,
  notifications,
  countries,
});
