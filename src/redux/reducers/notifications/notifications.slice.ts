import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'redux/store.types';

import { getNotificationsListThunk } from './notifications.thunks';

import type { INotificationsSlice } from './notifications.types';

const initialState: INotificationsSlice = {
  isLoading: false,
  list: [],
  count: 0,
  unseen_count: 0,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
      state.count += 1;
      state.unseen_count += 1;
    },
    resetNotifications: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getNotificationsListThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getNotificationsListThunk.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        ...payload,
      }))
      .addCase(getNotificationsListThunk.rejected, state => {
        state.isLoading = false;
      });
  },
});

// ACTIONS
export const { addNotification, resetNotifications } =
  notificationsSlice.actions;

// SELECTORS
export const selectIsNotificationsLoading = (state: RootState) =>
  state.notifications.isLoading;
export const selectNotificationsCount = (state: RootState) =>
  state.notifications.count;
export const selectUnseenNotificationsCount = (state: RootState) =>
  state.notifications.unseen_count;

export default notificationsSlice.reducer;
