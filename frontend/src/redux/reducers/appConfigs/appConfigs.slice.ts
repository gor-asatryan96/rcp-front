import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store.types';

import { IAppConfigs } from './appConfigs.types';

const initialState: IAppConfigs = {
  isSidebarOpen: false,
};

export const appConfigsSlice = createSlice({
  name: 'appConfigs',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      console.log('action', action);
      state.isSidebarOpen = action.payload;
    },
    resetAppConfigs: () => initialState,
  },
});

// ACTIONS
export const { toggleSidebar, resetAppConfigs } = appConfigsSlice.actions;

// SELECTORS
export const selectIsSidebarOpen = (state: RootState) =>
  state.appConfigs.isSidebarOpen;

export default appConfigsSlice.reducer;
