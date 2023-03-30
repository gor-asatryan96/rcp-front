import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IAclPath } from 'components/Routes/routes.types';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import { loginByTokenThunk, loginThunk } from './serverConfigs.thunks';

const initialState: IServerConfigs = {
  isConnected: false,
  isLoading: false,
  user: {
    id: null,
    acl: [],
    created_at: '',
    email: '',
    is_active: 0,
    is_sp_reset: 0,
    is_twofa_enabled: 0,
    isPasswordChangeRequired: false,
    locale: 'EN',
    role: 'USER',
    sp_updated_at: '',
    timezone: '',
    token: '',
    updated_at: '',
    username: '',
  },
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
        state.user = payload;
        if (meta.arg.isRemember) {
          localStorage.setItem('token', payload.token);
        }
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
        toast.error('username or password incorrect!');
      })
      .addCase(loginByTokenThunk.fulfilled, (state, action) => {
        state.isConnected = true;
        state.user = action.payload;
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
export const selectUserAcl = (state: RootState) => state.serverConfigs.user.acl;
export const selectIsTFAConnected = (state: RootState) =>
  !!state.serverConfigs.user.is_twofa_enabled;
export const selectIsAclExist = (state: RootState, aclPath: IAclPath) =>
  state.serverConfigs.user.acl.includes(aclPath);
export const selectIsServerConfigsLoading = (state: RootState) =>
  state.serverConfigs.isLoading;
export const selectIsAuth = (state: RootState) => !!state.serverConfigs.user.id;
export const selectIsPasswordChangeRequired = (state: RootState) =>
  state.serverConfigs.user.isPasswordChangeRequired;

export default serverConfigsSlice.reducer;
