import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu_visibility',
  initialState: true,
  reducers: {
    visibility: (state, action) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { visibility } = menuSlice.actions;
