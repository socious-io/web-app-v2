import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from './reducers/chat.reducer';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
