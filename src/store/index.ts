import { configureStore } from '@reduxjs/toolkit';

import { chatSlice } from './reducers/chat.reducer';
import { contractsSlice } from './reducers/contracts.reducer';
import { eventsSlice } from './reducers/events.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { linkedInSlice } from './reducers/linkedin.reducer';
import { profileSlice } from './reducers/profile.reducer';
import { skillsSlice } from './reducers/skills.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';
import { walletSlice } from './reducers/wallet.reducer';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    identity: identitySlice.reducer,
    spinner: spinnerSlice.reducer,
    profile: profileSlice.reducer,
    contracts: contractsSlice.reducer,
    skills: skillsSlice.reducer,
    events: eventsSlice.reducer,
    linkedin: linkedInSlice.reducer,
    wallet: walletSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modals/openModal', 'wallet/setWalletState'],
        ignoredPaths: ['wallet.wallet', 'wallet.walletProvider'],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
