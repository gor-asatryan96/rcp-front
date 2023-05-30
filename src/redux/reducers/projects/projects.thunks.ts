import { createAsyncThunk } from '@reduxjs/toolkit';

import { IProjectResponse, ProjectService } from 'services/projects';

import {
  ICountry,
  IGeneralListSetResponse,
  IProjectGeneralLimits,
  TProjectId,
} from './projects.types';

import type { IErrorMessage } from 'redux/store.types';

export const getProjectsThunk = createAsyncThunk<
  ICountry[],
  undefined,
  {
    rejectValue: IErrorMessage;
  }
>('projects/get', async (_, { rejectWithValue }) => {
  const response = await ProjectService.getProjectList().catch(err => {
    return rejectWithValue(err.response.data);
  });
  return response;
});

export const getChooseProjectThunck = createAsyncThunk<
  IProjectResponse,
  TProjectId,
  {
    rejectValue: IErrorMessage;
  }
>('projects/getChoosenProject', async (projectId, { rejectWithValue }) => {
  const response = await ProjectService.chooseProject(projectId).catch(err => {
    return rejectWithValue(err.response.data);
  });
  return response;
});

export const getGeneralLimitsThunk = createAsyncThunk<
  IProjectGeneralLimits,
  undefined,
  {
    rejectValue: IErrorMessage;
  }
>('projects/getGeneralLimits', async (_, { rejectWithValue }) => {
  const response = await ProjectService.getGeneralLimits().catch(err => {
    return rejectWithValue(err.response.data);
  });
  return response;
});

export const setGeneralLimitsThunk = createAsyncThunk<
  IGeneralListSetResponse,
  IProjectGeneralLimits,
  {
    rejectValue: IErrorMessage;
  }
>('projects/setGeneralLimits', async (data, { rejectWithValue, dispatch }) => {
  const response = await ProjectService.setGeneralLimits(data).catch(err => {
    return rejectWithValue(err.response.data);
  });
  dispatch(getGeneralLimitsThunk());
  return response;
});
