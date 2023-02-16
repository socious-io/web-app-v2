import { createSlice } from '@reduxjs/toolkit';

export type CreateOrgWizard = {
  type: string;
  SocialCauses: string[];
};

export const createOrgWizardSlice = createSlice({
  name: 'create-org-wizard',
  initialState: {
    type: '',
    socialCauses: [],
  },
  reducers: {
    setOrgType: (state, action) => {
      state.type = action.payload;
    },
    setSocialCauses: (state, action) => {
      state.socialCauses = action.payload;
    },
  },
});

export const { setOrgType, setSocialCauses } = createOrgWizardSlice.actions;
