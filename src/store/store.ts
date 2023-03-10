import { spinnerSlice } from './reducers/spinner.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from './reducers/chat.reducer';
import { createOrgWizardSlice } from './reducers/createOrgWizard.reducer';
import { createPostWizardSlice } from './reducers/createPostWizard.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { menuSlice } from './reducers/menu.reducer';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    identity: identitySlice.reducer,
    menu: menuSlice.reducer,
    createOrgWizard: createOrgWizardSlice.reducer,
    createPostWizard: createPostWizardSlice.reducer,
    spinner: spinnerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
