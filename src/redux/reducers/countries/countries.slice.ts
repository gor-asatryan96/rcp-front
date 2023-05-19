import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store.types';

interface CountryState {
  countriesName: string[];
  selectedCountry: string;
}

const initialState: CountryState = {
  countriesName: [
    'PMBETTZ',
    'VAMOS',
    'HABESHA',
    'PMBETKE',
    'PMBETZM',
    'MLOTT',
    'YULDUZBET',
    'BWANABET',
    'MAVERIX',
  ],
  selectedCountry: 'Select project',
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    selectCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
  },
});

// ACTIONS
export const { selectCountry } = countriesSlice.actions;

// SELECTORS
export const selectCountries = (state: RootState) =>
  state.countries.countriesName;

export default countriesSlice.reducer;
