import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { wait } from '../../../helpers/utils';

import { UserToken, ILoginForm, IAcl } from './serverConfigs.types';

interface IConfigsResponse {
  userId: string;
  token: UserToken;
  acl: IAcl;
}

export const loginThunk = createAsyncThunk<IConfigsResponse, ILoginForm>(
  'configs/get',
  async () => {
    const response = await axios.get<IConfigsResponse>('/login');
    await wait();
    return response.data;
  },
);

export const loginByTokenThunk = createAsyncThunk<
  IConfigsResponse[],
  UserToken
>('configs/getByToken', async token => {
  const response = await axios.get<IConfigsResponse[]>('/users', {
    params: { token },
  });
  await wait();
  return response.data;
});
