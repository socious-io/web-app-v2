import { createSlice } from '@reduxjs/toolkit';

import { IdentityReq } from '../../core/types';

export const identitySlice = createSlice({
  name: 'identity',
  initialState: {
    entities: [],
    // currentIdentity: {},
  } as { entities: IdentityReq[] },
  reducers: {
    setIdentityList: (state, action) => {
      state.entities = action.payload;
    },
  },
});

export const { setIdentityList } = identitySlice.actions;
