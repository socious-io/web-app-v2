import { configureStore } from '@reduxjs/toolkit';

import { chatSlice } from './reducers/chat.reducer';
import { contractsSlice } from './reducers/contracts.reducer';
import { createOrgWizardSlice } from './reducers/createOrgWizard.reducer';
import { createPostWizardSlice } from './reducers/createPostWizard.reducer';
import { createQuestionWizardSlice } from './reducers/createQuestionWizard.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { menuSlice } from './reducers/menu.reducer';
import { modalsSlice } from './reducers/modal.reducer';
import { profileSlice } from './reducers/profile.reducer';
import { skillsSlice } from './reducers/skills.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    identity: identitySlice.reducer,
    menu: menuSlice.reducer,
    createOrgWizard: createOrgWizardSlice.reducer,
    createPostWizard: createPostWizardSlice.reducer,
    createQuestionWizard: createQuestionWizardSlice.reducer,
    spinner: spinnerSlice.reducer,
    modal: modalsSlice.reducer,
    profile: profileSlice.reducer,
    contracts: contractsSlice.reducer,
    skills: skillsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modals/openModal'],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
