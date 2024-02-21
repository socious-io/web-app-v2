import { createAsyncThunk } from '@reduxjs/toolkit';
import { unreadCounts } from 'src/core/api';

export const getUnreadCount = createAsyncThunk('chat/getUnreadCount', async () => {
  const res = await unreadCounts();
  return res.count;
});
