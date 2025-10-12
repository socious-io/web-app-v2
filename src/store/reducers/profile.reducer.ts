import { createSlice } from '@reduxjs/toolkit';
import { Badge, Mission, Organization, User, UserType } from 'src/core/api';

import { updateOrgProfile, updateUserProfile } from '../thunks/profile.thunks';

type State = {
  identity: User | Organization | undefined;
  type: UserType;
  status: 'loading' | 'idle' | 'succeeded' | 'failed';
  error: any;
};

const initialState: State = {
  identity: undefined,
  type: 'users',
  status: 'idle',
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
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
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.type = 'users';
        state.identity = {
          ...action.payload,
          following: state.identity?.following || false,
          follower: state.identity?.follower || false,
          connection_status: state.identity?.connection_status || 'PENDING',
          connection_id: state.identity?.connection_id || '',
          is_contributor: (state.identity as User).is_contributor,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrgProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateOrgProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.type = 'organizations';
        state.identity = {
          ...action.payload,
          following: state.identity?.following || false,
          follower: state.identity?.follower || false,
          connection_status: state.identity?.connection_status || 'PENDING',
          connection_id: state.identity?.connection_id || '',
        };
      })
      .addCase(updateOrgProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentity, setIdentityType, setConnectionStatus } = profileSlice.actions;
