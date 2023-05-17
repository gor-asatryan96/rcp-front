import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  INotificationListRequestBody,
  INotificationSeenRequestBody,
  INotificationListResponse,
  NotificationService,
} from 'services/notification';

import type { IErrorMessage } from 'redux/store.types';

export const getNotificationsListThunk = createAsyncThunk<
  INotificationListResponse,
  INotificationListRequestBody,
  { rejectValue: IErrorMessage }
>('notifications/getList', async (data, { rejectWithValue }) => {
  const response = await NotificationService.getList(data).catch(err => {
    return rejectWithValue(err.response.data);
  });
  return response;
});

export const seenNotificationThunk = createAsyncThunk<
  null,
  INotificationSeenRequestBody,
  { rejectValue: IErrorMessage }
>('notifications/seen', async (data, { rejectWithValue }) => {
  const response = await NotificationService.seen(data).catch(err => {
    return rejectWithValue(err.response.data);
  });
  return response;
});
