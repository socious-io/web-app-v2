import { createSlice } from '@reduxjs/toolkit';
import { CurrentIdentity } from 'src/core/api';

import { currentIdentities } from '../thunks/identity.thunks';

const initState = {
  entities: [],
  status: 'idle',
  error: null,
  avatarImage: '',
};
export const identitySlice = createSlice({
  name: 'identity',
  initialState: initState as {
    entities: CurrentIdentity[];
    status: string;
    error: any;
    avatarImage: string;
  },
  reducers: {
    setIdentityList: (state, action) => {
      state.entities = action.payload;

      const identity = state.entities.find((identity) => identity.current);
      if (identity && identity.meta) {
        state.avatarImage =
          'avatar' in identity.meta
            ? identity.meta.avatar || ''
            : 'image' in identity.meta
            ? identity.meta.image || ''
            : '';
      } else state.avatarImage = '';
    },
    removeIdentityList: () => {
      return initState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentIdentities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(currentIdentities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(currentIdentities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentityList, removeIdentityList } = identitySlice.actions;
