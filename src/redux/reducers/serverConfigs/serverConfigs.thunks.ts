import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthService, ILoginBody } from 'services/auth';

import { selectCountry } from '../projects/projects.slice';

import type { UserToken, ILoginForm, IUser } from './serverConfigs.types';
import type { IErrorMessage } from 'redux/store.types';

export const loginThunk = createAsyncThunk<
  IUser,
  ILoginForm,
  { rejectValue: IErrorMessage }
>(
  'configs/get',
  async ({ username, password, tft }, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.login({
        username,
        password,
        tft,
      });
      if (response.meta?.currentProject?.id) {
        dispatch(selectCountry(response.meta.currentProject.id));
      }
      return response;
    } catch (err) {
      const error = err as unknown as AxiosError<IErrorMessage>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginByTokenThunk = createAsyncThunk<IUser, UserToken>(
  'configs/getByToken',
  async (token, { dispatch }) => {
    const response = await AuthService.getProfileByToken(token);

    if (response.meta.currentProject.id) {
      dispatch(selectCountry(response.meta.currentProject.id));
    }

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
