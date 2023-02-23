import { configureStore } from '@reduxjs/toolkit';

import { getIsDevelopment } from '../helpers/utils';

import { reducers } from './reducers';

export const store = configureStore({
  reducer: reducers,
  devTools: getIsDevelopment(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});
