import { createAsyncThunk } from '@reduxjs/toolkit';
import { userOffers } from 'src/core/api';

export const getContracts = createAsyncThunk('contracts/get', async (params: { page: number; limit: number }) => {
  const { page, limit } = params;
  const offers = await userOffers({ page, limit });

  return {
    offers: offers.items,
    page,
    limit,
    totalCount: offers.total_count,
  };
});
