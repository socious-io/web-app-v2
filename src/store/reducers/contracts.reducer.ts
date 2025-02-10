import { createSlice } from '@reduxjs/toolkit';
import { Contract, ContractFilters } from 'src/core/adaptors';

import { getContractStatus, getContracts } from '../thunks/contracts.thunk';

export interface ContractsState {
  list: Contract[];
  page: number;
  limit: number;
  total: number;
  error: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedOfferId?: string;
  filter: ContractFilters;
  openSlider: boolean;
}
const initialState = {
  list: [],
  page: 1,
  limit: 5,
  total: 0,
  error: '',
  status: 'idle',
  filter: 'all',
  openSlider: false,
} as ContractsState;

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedOfferId = action.payload;
    },
    updateStatus: (state, action) => {
      state.list = state.list.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              status: action.payload.status,
              semanticStatus: getContractStatus(
                action.payload.status,
                action.payload.isCurrentProvider,
                action.payload.type,
                !!action.payload.paymentId,
              ),
            }
          : item,
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateFeedback: (state, action) => {
      state.list = state.list.map(item =>
        item.id === action.payload.id ? { ...item, feedback: action.payload.feedback } : item,
      );
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    handleDisplaySlider: (state, action) => {
      state.openSlider = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContracts.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.list = action.payload?.contracts || [];
        state.page = action.payload?.page || 1;
        state.limit = action.payload?.limit || 10;
        state.total = action.payload?.total || 0;
        state.status = 'succeeded';
        state.error = '';
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { setSelected, updateStatus, updateFeedback, updateFilter, updatePage, handleDisplaySlider } =
  contractsSlice.actions;
