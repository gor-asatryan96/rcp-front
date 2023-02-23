import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IConfigsResponse {
  userId: string;
}

export const getServerConfigsThunk = createAsyncThunk<
  IConfigsResponse,
  undefined
>('configs/get', async () => {
  const response = await axios.get<IConfigsResponse>('get-game-versions', {
    params: { duration: 1 },
  });
  return response.data;
});
