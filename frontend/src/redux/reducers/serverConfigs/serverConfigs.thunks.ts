import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { wait } from '../../../helpers/utils';

import { UserToken } from './serverConfigs.types';

interface IConfigsResponse {
  userId: string;
}

export const loginThunk = createAsyncThunk<IConfigsResponse, undefined>(
  'configs/get',
  async () => {
    const response = await axios.get<IConfigsResponse>('/login');
    await wait(3000);
    return response.data;
  },
);

export const loginByTokenThunk = createAsyncThunk<IConfigsResponse, UserToken>(
  'configs/getByToken',
  async token => {
    const response = await axios.get<IConfigsResponse>('/users', {
      params: { token },
    });
    return response.data;
  },
);
