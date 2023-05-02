import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store.types';

import { IAppConfigs } from './appConfigs.types';

const initialState: IAppConfigs = {
  isMenuSidebarOpen: false,
  isNotificationSidebarOpen: false,
  isGlobalScrollOff: false,
};

export const appConfigsSlice = createSlice({
  name: 'appConfigs',
  initialState,
  reducers: {
    toggleMenuSidebar: (state, action: PayloadAction<boolean>) => {
      state.isMenuSidebarOpen = action.payload;
    },
    toggleNotificationSidebar: (state, action: PayloadAction<boolean>) => {
      state.isNotificationSidebarOpen = action.payload;
    },
    toggleGlobalScroll: (state, action: PayloadAction<boolean>) => {
      state.isGlobalScrollOff = action.payload;
    },
    resetAppConfigs: () => initialState,
  },
});

// ACTIONS
export const {
  toggleMenuSidebar,
  toggleNotificationSidebar,
  toggleGlobalScroll,
  resetAppConfigs,
} = appConfigsSlice.actions;

// SELECTORS
export const selectIsMenuSidebarOpen = (state: RootState) =>
  state.appConfigs.isMenuSidebarOpen;
export const selectIsNotificationSidebarOpen = (state: RootState) =>
  state.appConfigs.isNotificationSidebarOpen;
export const selectIsGlobalScrollOff = (state: RootState) =>
  state.appConfigs.isGlobalScrollOff || state.appConfigs.isMenuSidebarOpen;

export default appConfigsSlice.reducer;
