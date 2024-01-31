import { createSlice } from '@reduxjs/toolkit';
import { OrganizationType, SocialCauses } from 'src/core/api';

export type CreateOrgWizard = {
  type?: OrganizationType;
  socialCauses: SocialCauses[];
  organizationName: string;
  bio: string;
  organizationEmail: string;
  country: string;
  city: string;
  geoname_id: number;
  address?: string;
  countryMobileCode?: string;
  phoneNumber?: string;
  website?: string;
  mission?: string;
  culture?: string;
  agreement?: boolean;
  //   description: string;
};

const initialState: CreateOrgWizard = {
  socialCauses: [],
  mission: '',
  culture: '',
  organizationName: '',
  bio: '',
  organizationEmail: '',
  geoname_id: 0,
  country: '',
  city: '',
  address: '',
  countryMobileCode: '',
  phoneNumber: '',
  website: '',
  //   description: '',
};

export const createOrgWizardSlice = createSlice({
  name: 'create-org-wizard',
  initialState,
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
    setGeonameId: (state, action) => {
      state.geoname_id = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCountryMobileCode: (state, action) => {
      state.countryMobileCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setAgreement: (state, action) => {
      state.agreement = action.payload;
    },
    resetCreateOrgWizard: () => {
      return initialState;
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
  setCountryMobileCode,
  setPhoneNumber,
  setWebsite,
  setGeonameId,
  setAgreement,
  resetCreateOrgWizard,
} = createOrgWizardSlice.actions;
