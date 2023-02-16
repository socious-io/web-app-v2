import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu_visibility',
  initialState: false,
  reducers: {
    visibility: (state, action) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { visibility } = menuSlice.actions;
