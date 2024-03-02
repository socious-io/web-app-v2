import { createSlice } from '@reduxjs/toolkit';
import { Contract } from 'src/core/api';

import { getContractStatus, getContracts } from '../thunks/contracts.thunk';

interface ContractsState {
  offers: Contract[];
  page: number;
  limit: number;
  totalCount: number;
  error: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';

  selectedOfferId?: string;
}
const initialState = {
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

    updateStatus: (state, action) => {
      const idx = state.offers.findIndex((item) => item.id === action.payload.id);
      state.offers[idx].status = action.payload.offerStatus;
      state.offers[idx].contractStatus = getContractStatus(
        action.payload.type,
        action.payload.paymentType,
        action.payload.offerStatus,
        action.payload.missionStatus,
      );
      if (action.payload.missionStatus)
        state.offers[idx].mission = { ...state.offers[idx].mission, status: action.payload.missionStatus };
    },

    updateFeedback: (state, action) => {
      const idx = state.offers.findIndex((item) => item.id === action.payload.id);
      state.offers[idx].org_feedback = action.payload.orgFeedback;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContracts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContracts.fulfilled, (state, action) => {
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
      });
  },
});

export const { setSelected, updateStatus, updateFeedback } = contractsSlice.actions;
