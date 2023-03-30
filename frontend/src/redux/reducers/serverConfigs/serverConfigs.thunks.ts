import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService, ILoginBody } from 'services/auth.service';

import { UserToken, ILoginForm, IUser } from './serverConfigs.types';

export interface IErrorMessage {
  message: string;
}

export const loginThunk = createAsyncThunk<
  IUser,
  ILoginForm,
  { rejectValue: IErrorMessage }
>('configs/get', async ({ username, password, tft }, { rejectWithValue }) => {
  const response = await AuthService.login({ username, password, tft }).catch(
    err => {
      return rejectWithValue(err.response.data);
    },
  );
  return response;
});

export const loginByTokenThunk = createAsyncThunk<IUser, UserToken>(
  'configs/getByToken',
  async token => {
    const response = await AuthService.getProfileByToken(token);
    return response;
  },
);

export const changeProfileThunk = createAsyncThunk<IUser, Partial<ILoginBody>>(
  'configs/changeProfile',
  async data => {
    const response = await AuthService.changeProfile(data);
    return response;
  },
);

export const applyInvitationThunk = createAsyncThunk<IUser, UserToken>(
  'configs/applyInvitation',
  async token => {
    const response = await AuthService.applyInvitation(token);
    return response;
  },
);
