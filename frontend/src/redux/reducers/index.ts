import { combineReducers } from '@reduxjs/toolkit';

import serverConfigs from './serverConfigs/serverConfigs.slice';
import appConfigs from './appConfigs/appConfigs.slice';

export const reducers = combineReducers({
  serverConfigs,
  appConfigs,
});
