import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store.types';

import { IServerConfigs } from './serverConfigs.types';
import { getServerConfigsThunk } from './serverConfigs.thunks';

const initialState: IServerConfigs = {
  isLoading: false,
  userId: '',
};

export const serverConfigsSlice = createSlice({
  name: 'serverConfigs',
  initialState,
  reducers: {
    resetServerConfigs: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getServerConfigsThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getServerConfigsThunk.rejected, state => {
        state.isLoading = false;
      });
  },
});

// ACTIONS
export const { resetServerConfigs } = serverConfigsSlice.actions;

// SELECTORS
export const selectIsServerConfigsLoading = (state: RootState) =>
  state.serverConfigs.isLoading;

export default serverConfigsSlice.reducer;
