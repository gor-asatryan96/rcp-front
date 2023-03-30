import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UserToken, ILoginForm, IUser } from './serverConfigs.types';

export const loginThunk = createAsyncThunk<IUser, ILoginForm>(
  'configs/get',
  async ({ username, password }) => {
    const response = await axios.post<IUser>('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
);

export const loginByTokenThunk = createAsyncThunk<IUser, UserToken>(
  'configs/getByToken',
  async token => {
    const response = await axios.post<IUser>('/auth/profile', null, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  },
);
