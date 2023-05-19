import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store.types';

interface Button {
  countryName: string;
  isActive: boolean;
  key: number;
}

type ButtonsState = Array<Button>;

const initialState: ButtonsState = [
  { countryName: 'PMBETTZ', isActive: false, key: 1 },
  { countryName: 'VAMOS', isActive: false, key: 2 },
  { countryName: 'HABESHA', isActive: false, key: 3 },
  { countryName: 'PMBETKE', isActive: false, key: 4 },
  { countryName: 'PMBETZM', isActive: false, key: 5 },
  { countryName: 'MLOTT', isActive: false, key: 6 },
  { countryName: 'YULDUZBET', isActive: false, key: 7 },
  { countryName: 'BWANABET', isActive: false, key: 8 },
  { countryName: 'MAVERIX', isActive: false, key: 9 },
];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setActiveCountry: (state, action: PayloadAction<string>) => {
      const names = action.payload;
      return state.map(country => {
        if (country.countryName === names) {
          return { ...country, isActive: true };
        }
        return { ...country, isActive: false };
      });
    },
  },
});

// ACTIONS
export const { setActiveCountry } = countriesSlice.actions;

// SELECTORS
export const selectCountry = (state: RootState) => state.countries;

export default countriesSlice.reducer;
