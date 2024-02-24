import { createSlice } from '@reduxjs/toolkit';
import { Chat } from 'src/core/api';

import { getUnreadCount } from '../thunks/chat.thunk';

interface ChatsState {
  entities: Chat[];
  unreadCount: string;
  error: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState = {
  entities: [],
  unreadCount: '0',
  error: '',
  status: 'idle',
} as ChatsState;

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.entities = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnreadCount.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getUnreadCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { setChatList } = chatSlice.actions;
