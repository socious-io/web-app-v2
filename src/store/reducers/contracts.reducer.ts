import { createSlice } from '@reduxjs/toolkit';
import { Mission, Offer } from 'src/core/api';

import { getContracts, getMissions } from '../thunks/contracts.thunk';

interface ContractsState {
  missions: Mission[];
  offers: Offer[];
  page: number;
  limit: number;
  totalCount: number;
  error: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedOfferId?: string;
}
const initialState = {
  missions: [],
  offers: [],
  page: 1,
  limit: 5,
  totalCount: 0,
  error: '',
  status: 'idle',
} as ContractsState;
export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedOfferId = action.payload;
    },

    updateOfferStatus: (state, action) => {
      const idx = state.offers.findIndex((item) => item.id === action.payload.id);
      state.offers[idx].status = action.payload.status;
    },
    updateMissionStatus: (state, action) => {
      const idx = state.missions.findIndex((item) => item.id === action.payload.id);
      state.missions[idx].status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContracts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.missions = action.payload.missions;
        state.offers = action.payload.offers;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalCount = action.payload.totalCount;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
      .addCase(getMissions.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        state.missions = action.payload.missions;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { setSelected, updateOfferStatus, updateMissionStatus } = contractsSlice.actions;
