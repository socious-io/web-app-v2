import { createSlice } from '@reduxjs/toolkit';
import { Badge, Mission, Organization, User } from 'src/core/api';

import { updateOrgProfile, updateUserProfile } from '../thunks/profile.thunks';

const initState = {
  identity: undefined,
  type: 'users',
  profileReq: undefined,
  badges: [],
  missions: [],
  status: 'idle',
  error: null,
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState: initState as {
    identity: User | Organization | undefined;
    type: 'users' | 'organizations';
    badges: Badge[];
    missions: Mission[];
    status: string;
    error: any;
  },
  reducers: {
    setIdentity: (state, action) => {
      state.identity = action.payload;
    },
    setIdentityType: (state, action) => {
      state.type = action.payload;
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
        state.identity = action.payload;
        state.type = 'users';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrgProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrgProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.identity = action.payload;
        state.type = 'organizations';
      })
      .addCase(updateOrgProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentity, setIdentityType, setBadges, setMissions } = profileSlice.actions;
