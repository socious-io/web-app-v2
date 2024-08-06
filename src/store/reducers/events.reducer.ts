import { createSlice } from '@reduxjs/toolkit';
import { Event } from 'src/core/api';

interface EventsState {
  items: Event[];
}
const initialState = {
  items: [],
} as EventsState;
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setEvents } = eventsSlice.actions;
