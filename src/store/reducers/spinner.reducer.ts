import { createSlice } from '@reduxjs/toolkit';

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: false,
  reducers: {
    showSpinner: () => {
      return true;
    },
    hideSpinner: () => {
      return false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
