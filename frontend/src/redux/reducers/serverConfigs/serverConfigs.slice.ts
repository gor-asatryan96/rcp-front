import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import { loginByTokenThunk, loginThunk } from './serverConfigs.thunks';

const initialState: IServerConfigs = {
  isConnected: false,
  isLoading: false,
  userId: '',
  token: '',
  acl: {},
};

export const serverConfigsSlice = createSlice({
  name: 'serverConfigs',
  initialState,
  reducers: {
    setIsConnected: state => {
      state.isConnected = true;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: () => {
      localStorage.removeItem('token');
      return { ...initialState, isConnected: true };
    },
    resetServerConfigs: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { payload, meta } = action;

        state.isLoading = false;
        state.userId = payload.userId;
        state.token = payload.token;
        if (payload.acl) {
          state.acl = payload.acl;
        }
        if (meta.arg.isRemember) {
          localStorage.setItem('token', payload.token);
        }
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
        toast.error('username or password incorrect!');
      })
      .addCase(loginByTokenThunk.fulfilled, (state, action) => {
        const data = action.payload[0];
        state.isConnected = true;
        state.token = data.token;
        state.userId = data.userId;
        if (data.acl) {
          state.acl = data.acl;
        }
      })
      .addCase(loginByTokenThunk.rejected, state => {
        state.isConnected = true;
        localStorage.removeItem('token');
      });
  },
});

// ACTIONS
export const { setIsConnected, setIsLoading, logout, resetServerConfigs } =
  serverConfigsSlice.actions;

// SELECTORS
export const selectIsConnected = (state: RootState) =>
  state.serverConfigs.isConnected;
export const selectUserAcl = (state: RootState) => state.serverConfigs.acl;
export const selectIsServerConfigsLoading = (state: RootState) =>
  state.serverConfigs.isLoading;
export const selectIsAuth = (state: RootState) => !!state.serverConfigs.userId;

export default serverConfigsSlice.reducer;
