import { createSlice } from '@reduxjs/toolkit';

export type CreateOrgWizard = {
  type: string;
  socialCauses: string[];
  mission: string;
  culture: string;
  organizationName: string;
  bio: string;
  organizationEmail: string;
  country: string;
  city: number;
  address: string;
  countryCode: string;
  phoneNumber: string;
  website: string;
};

export const createOrgWizardSlice = createSlice({
  name: 'create-org-wizard',
  initialState: {
    type: '',
    socialCauses: [],
    mission: '',
    culture: '',
    organizationName: '',
    bio: '',
    organizationEmail: '',
    country: '',
    city: 0,
    address: '',
    countryCode: '',
    phoneNumber: '',
    website: '',
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
    setOrganizationName: (state, action) => {
      state.organizationName = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setOrganizationEmail: (state, action) => {
      state.organizationEmail = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
  },
});

export const {
  setOrgType,
  setSocialCauses,
  setMission,
  setCulture,
  setOrganizationName,
  setBio,
  setOrganizationEmail,
  setCountry,
  setCity,
  setAddress,
  setCountryCode,
  setPhoneNumber,
  setWebsite,
} = createOrgWizardSlice.actions;
