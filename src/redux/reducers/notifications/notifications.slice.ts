import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store.types';

import {
  getNotificationsListThunk,
  seenNotificationThunk,
} from './notifications.thunks';

import type { INotificationsSlice } from './notifications.types';

const initialState: INotificationsSlice = {
  isLoading: true,
  list: [],
  count: 0,
  unseen_count: 0,
  page: 1,
  limit: 20,
  activeTab: 'All',
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      if (state.activeTab === 'All' || state.activeTab === 'Unseen') {
        state.list.push(action.payload);
      }
      state.count += 1;
      state.unseen_count += 1;
    },
    setNotificationPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetNotifications: () => initialState,
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.page = 1;
      state.list = [];
      state.count = 0;
      state.isLoading = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNotificationsListThunk.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        ...payload,
        list: [...state.list, ...payload.list],
      }))
      .addCase(getNotificationsListThunk.rejected, state => {
        state.isLoading = false;
      })
      .addCase(seenNotificationThunk.pending, (state, action) => {
        const currentNot = state.list.find(
          item => item.id === action.meta.arg.notificationId,
        );
        if (currentNot) {
          currentNot.seen = 1;
          state.unseen_count -= 1;
        }
      });
  },
});

// ACTIONS
export const {
  addNotification,
  setNotificationPage,
  resetNotifications,
  setActiveTab,
} = notificationsSlice.actions;

// SELECTORS
export const selectIsNotificationsLoading = (state: RootState) =>
  state.notifications.isLoading;
export const selectNotificationsCount = (state: RootState) =>
  state.notifications.count;
export const selectUnseenNotificationsCount = (state: RootState) =>
  state.notifications.unseen_count;
export const selectNotificationsList = (state: RootState) =>
  state.notifications.list;
export const selectNotificationActiveTab = (state: RootState) =>
  state.notifications.activeTab;
export const selectNotificationPage = (state: RootState) =>
  state.notifications.page;
export const selectNotificationLimit = (state: RootState) =>
  state.notifications.limit;

export default notificationsSlice.reducer;
