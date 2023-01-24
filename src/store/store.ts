import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from './reducers/chat.reducer';
import { identitySlice } from './reducers/identity.reducer';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    identity: identitySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
