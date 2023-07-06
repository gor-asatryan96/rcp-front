import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import i18n from 'assets/translations';
import { IAclPath } from 'components/Routes/routes.types';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import {
  applyInvitationThunk,
  changeProfileThunk,
  loginByTokenThunk,
  loginThunk,
} from './serverConfigs.thunks';

const initialState: IServerConfigs = {
  isConnected: false,
  isLoading: false,
  isProfileChangeLoading: false,
  isNewProfile: false,
  user: {
    id: null,
    acl: [],
    created_at: '',
    email: '',
    is_active: 1,
    is_sp_reset: 0,
    is_twofa_enabled: 0,
    locale: 'EN',
    role: 'USER',
    sp_updated_at: '',
    timezone: '',
    token: '',
    updated_at: '',
    username: '',
    meta: {
      last_action_at: '',
      currentProject: { id: 0, is_active: 0, project: '' },
    },
    ws_token: '',
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
    toggleTFA: state => {
      state.user.is_twofa_enabled = 1;
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
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload?.message || i18n.t('You have incorrect field!'));
      })
      .addCase(loginByTokenThunk.fulfilled, (state, action) => {
        state.isConnected = true;
        state.user = action.payload;
      })
      .addCase(loginByTokenThunk.rejected, state => {
        state.isConnected = true;
        localStorage.removeItem('token');
      })
      .addCase(applyInvitationThunk.fulfilled, (state, action) => {
        state.isConnected = true;
        state.user = action.payload;
        state.isNewProfile = true;
      })
      .addCase(applyInvitationThunk.rejected, state => {
        state.isConnected = true;
      })
      .addCase(changeProfileThunk.pending, state => {
        state.isProfileChangeLoading = true;
      })
      .addCase(changeProfileThunk.fulfilled, state => {
        state.isProfileChangeLoading = false;
        state.user.is_sp_reset = 0;
        toast.success(i18n.t('Your profile has successfully updated'));
      })
      .addCase(changeProfileThunk.rejected, (state, { payload }) => {
        state.isProfileChangeLoading = false;
        toast.error(payload?.message || i18n.t('Something went wrong'));
      });
  },
});

// ACTIONS
export const {
  setIsConnected,
  setIsLoading,
  toggleTFA,
  logout,
  resetServerConfigs,
} = serverConfigsSlice.actions;

// SELECTORS
export const selectIsConnected = (state: RootState) =>
  state.serverConfigs.isConnected;
export const selectUserAcl = (state: RootState) => state.serverConfigs.user.acl;
export const selecTimezone = (state: RootState) =>
  state.serverConfigs.user.timezone;
export const selectIsTFAConnected = (state: RootState) =>
  !!state.serverConfigs.user.is_twofa_enabled;
export const selectIsAclExist = (state: RootState, aclPath: IAclPath) =>
  state.serverConfigs.user.acl.includes(aclPath);
export const selectIsServerConfigsLoading = (state: RootState) =>
  state.serverConfigs.isLoading;
export const selectIsProfileChangeLoading = (state: RootState) =>
  state.serverConfigs.isProfileChangeLoading;
export const selectIsNewProfile = (state: RootState) =>
  state.serverConfigs.isNewProfile;
export const selectIsAuth = (state: RootState) =>
  !!state.serverConfigs.user.id && !state.serverConfigs.user.is_sp_reset;
export const selectIsPasswordChangeRequired = (state: RootState) =>
  !!state.serverConfigs.user.is_sp_reset;

export default serverConfigsSlice.reducer;
