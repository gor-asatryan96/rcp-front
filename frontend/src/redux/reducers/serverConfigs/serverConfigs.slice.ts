import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import { loginThunk } from './serverConfigs.thunks';

const initialState: IServerConfigs = {
  isConnected: false,
  isLoading: false,
  userId: '',
  token: '',
};

export const serverConfigsSlice = createSlice({
  name: 'serverConfigs',
  initialState,
  reducers: {
    setIsConnected: state => {
      state.isConnected = true;
    },
    resetServerConfigs: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
      });
  },
});

// ACTIONS
export const { setIsConnected, resetServerConfigs } =
  serverConfigsSlice.actions;

// SELECTORS
export const selectIsConnected = (state: RootState) =>
  state.serverConfigs.isConnected;
export const selectIsServerConfigsLoading = (state: RootState) =>
  state.serverConfigs.isLoading;
export const selectIsAuth = (state: RootState) => !!state.serverConfigs.userId;

export default serverConfigsSlice.reducer;
