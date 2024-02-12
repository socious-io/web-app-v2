import { createAsyncThunk } from '@reduxjs/toolkit';
import { userMissions, userOffers } from 'src/core/api';

export const getContracts = createAsyncThunk('contracts/get', async (params: { page: number; limit: number }) => {
  const { page, limit } = params;
  const offers = await userOffers({ page, limit });
  const missions = await userMissions();

  return {
    missions: missions.items,
    offers: offers.items,
    page,
    limit,
    totalCount: offers.total_count,
  };
});

export const getMissions = createAsyncThunk('contracts/getMissions', async () => {
  const missions = await userMissions();

  return {
    missions: missions.items,
  };
});
