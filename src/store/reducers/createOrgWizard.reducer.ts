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
    mission: '',
    culture: '',
  },
  reducers: {
    setOrgType: (state, action) => {
      state.type = action.payload;
    },
    setSocialCauses: (state, action) => {
      state.socialCauses = action.payload;
    },
    setMission: (state, action) => {
      state.mission = action.payload;
    },
    setCulture: (state, action) => {
      state.culture = action.payload;
    },
  },
});

export const { setOrgType, setSocialCauses, setMission, setCulture } = createOrgWizardSlice.actions;
