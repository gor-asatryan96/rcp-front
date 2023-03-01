import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import { loginByTokenThunk, loginThunk } from './serverConfigs.thunks';

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
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
      })
      .addCase(loginByTokenThunk.fulfilled, (state, action) => {
        state.isConnected = true;
        state.token = action.payload[0].token;
        state.userId = action.payload[0].userId;
      })
      .addCase(loginByTokenThunk.rejected, state => {
        state.isConnected = true;
        localStorage.removeItem('token');
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
