import { createSlice } from '@reduxjs/toolkit';
import { CurrentIdentity } from 'src/core/api';
import { currentIdentities } from 'src/core/api/auth/auth.service';

export const identitySlice = createSlice({
  name: 'identity',
  initialState: {
    entities: [],
    status: 'idle',
    error: null,
  } as { entities: CurrentIdentity[]; status: string; error: any },
  reducers: {
    setIdentityList: (state, action) => {
      state.entities = action.payload;
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

export const { setIdentityList } = identitySlice.actions;
