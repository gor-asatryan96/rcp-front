import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AuthService, ILoginBody } from 'services/auth';

import { resetProjectsSlice, selectCountry } from '../projects/projects.slice';

import type { UserToken, ILoginForm, IUser } from './serverConfigs.types';
import type { IErrorMessage } from 'redux/store.types';

export const loginThunk = createAsyncThunk<
  IUser,
  ILoginForm,
  { rejectValue: IErrorMessage }
>(
  'configs/get',
  async (
    { password, tft, lastName, firstName, username, oldPassword },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await AuthService.login({
        password,
        oldPassword,
        tft,
        lastName,
        firstName,
        username,
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

export const changeProfileThunk = createAsyncThunk<
  IUser,
  Partial<ILoginBody>,
  { rejectValue: IErrorMessage }
>('configs/changeProfile', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.changeProfile(data);
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError<IErrorMessage>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const applyInvitationThunk = createAsyncThunk<IUser, UserToken>(
  'configs/applyInvitation',
  async (token, { rejectWithValue }) => {
    try {
      const response = await AuthService.applyInvitation(token);
      return response;
    } catch (err) {
      const error = err as unknown as AxiosError<IErrorMessage>;
      if (!error.response) {
        throw err;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
      dispatch(resetProjectsSlice());
      return response;
    } catch (err) {
      const error = err as unknown as AxiosError<IErrorMessage>;
      if (!error.response) {
        throw err;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
