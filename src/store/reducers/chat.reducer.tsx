import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: { entities: [] },
  reducers: {
    setChatList: (state, action) => {
      state.entities = action.payload.items;
    },
  },
});

export const { setChatList } = chatSlice.actions;
