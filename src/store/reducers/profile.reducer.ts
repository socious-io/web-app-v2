import { createSlice } from '@reduxjs/toolkit';
import { Badge, Mission, User } from 'src/core/api';

import { updateUserProfile } from '../thunks/profile.thunks';

const initState = {
  user: undefined,
  profileReq: undefined,
  badges: [],
  missions: [],
  status: 'idle',
  error: null,
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState: initState as {
    user: User | undefined;
    badges: Badge[];
    missions: Mission[];
    status: string;
    error: any;
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBadges: (state, action) => {
      state.badges = action.payload;
    },
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser, setBadges, setMissions } = profileSlice.actions;
