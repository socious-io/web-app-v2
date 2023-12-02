import { createSlice } from '@reduxjs/toolkit';
import { Badge, Mission, User } from 'src/core/api';

const initState = {
  user: undefined,
  badges: [],
  missions: [],
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState: initState as {
    user: User | undefined;
    badges: Badge[];
    missions: Mission[];
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBadges: (state, action) => {
      state.badges = action.payload;
    },
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
  },
});

export const { setUser, setBadges, setMissions } = profileSlice.actions;
