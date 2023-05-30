import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import i18n from 'assets/translations';
import { RootState } from 'redux/store.types';

import { IProjectsSlice, TProjectId } from './projects.types';
import {
  getChooseProjectThunck,
  getGeneralLimitsThunk,
  getProjectsThunk,
  setGeneralLimitsThunk,
} from './projects.thunks';

const initialState: IProjectsSlice = {
  countries: [],
  project: '',
  project_db: '',
  activeProjectId: null,
  generalLimits: {
    casino_ggr_limit: 0,
    casino_winning_limit: 0,
    daily_withdraw_limit: 0,
    games_ggr_limit: 0,
    games_winning_limit: 0,
    sport_ggr_limit: 0,
    sport_winning_limit: 0,
    used_unused_percentage: 0,
  },
  isLoading: false,
  isGeneralLimitsLoading: false,
  success: false,
};

export const projectsSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    selectCountry: (state, action: PayloadAction<TProjectId>) => {
      state.activeProjectId = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProjectsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProjectsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload;
      })
      .addCase(getProjectsThunk.rejected, state => {
        state.isLoading = false;
        toast.error(i18n.t('Something went wrong'));
      })
      .addCase(getChooseProjectThunck.pending, state => {
        state.isLoading = true;
      })
      .addCase(getChooseProjectThunck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload.project;
        state.activeProjectId = action.payload.id;
      })
      .addCase(getChooseProjectThunck.rejected, state => {
        state.isLoading = false;
        toast.error(i18n.t('Something went wrong'));
      })
      .addCase(getGeneralLimitsThunk.pending, state => {
        state.isGeneralLimitsLoading = true;
      })
      .addCase(getGeneralLimitsThunk.fulfilled, (state, action) => {
        state.isGeneralLimitsLoading = false;
        state.generalLimits = action.payload;
      })
      .addCase(getGeneralLimitsThunk.rejected, state => {
        state.isGeneralLimitsLoading = false;
        toast.error(i18n.t('Something went wrong'));
      })
      .addCase(setGeneralLimitsThunk.pending, state => {
        state.isGeneralLimitsLoading = true;
      })
      .addCase(setGeneralLimitsThunk.fulfilled, state => {
        state.isGeneralLimitsLoading = false;
        state.success = true;
      })
      .addCase(setGeneralLimitsThunk.rejected, state => {
        state.isGeneralLimitsLoading = false;
        toast.error(i18n.t('Something went wrong'));
      });
  },
});

// ACTIONS
export const { selectCountry, setIsLoading } = projectsSlice.actions;

// SELECTORS
export const selectCountries = (state: RootState) => state.projects.countries;
export const selectIsEditModalSuccess = (state: RootState) =>
  state.projects.success;
export const selectActiveProjectID = (state: RootState) =>
  state.projects.activeProjectId;
export const selectIsCountryChoosen = (state: RootState) =>
  !!state.projects.activeProjectId;
export const selectIsGeneralLimitsLoading = (state: RootState) =>
  state.projects.isGeneralLimitsLoading;
export const selectGeneralLimits = (state: RootState) =>
  state.projects.generalLimits;
export default projectsSlice.reducer;
