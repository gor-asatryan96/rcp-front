import { combineReducers } from '@reduxjs/toolkit';

import serverConfigs from './serverConfigs/serverConfigs.slice';

export const reducers = combineReducers({
  serverConfigs,
});
