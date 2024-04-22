import { createSlice } from '@reduxjs/toolkit';
import { Badge, Mission, OrganizationProfile, UserProfile } from 'src/core/api';

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
    identity: UserProfile | OrganizationProfile | undefined;
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
    setConnectionStatus: (state, action) => {
      if (state.identity) {
        state.identity.connection_status = action.payload.connection_status;
        state.identity.connection_id = action.payload.connection_id;
        state.identity.follower = action.payload.follower;
        state.identity.following = action.payload.following;
      }
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
        state.identity = {
          ...action.payload,
          following: state.identity?.following || false,
          follower: state.identity?.follower || false,
          connection_status: state.identity?.connection_status || 'PENDING',
          connection_id: state.identity?.connection_id || '',
        };
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
        state.identity = {
          ...action.payload,
          following: state.identity?.following || false,
          follower: state.identity?.follower || false,
          connection_status: state.identity?.connection_status || 'PENDING',
          connection_id: state.identity?.connection_id || '',
        };
        state.type = 'organizations';
      })
      .addCase(updateOrgProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentity, setIdentityType, setBadges, setMissions, setConnectionStatus } = profileSlice.actions;
