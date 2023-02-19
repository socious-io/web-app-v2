import { createSlice } from '@reduxjs/toolkit';

export type CreatePostWizard = {
  title: string;
  description: string;
  remote_preference: string;
  status: 'DRAFT' | 'EXPIRE' | 'ACTIVE';
  country: string;
  project_type: string;
  project_length: string;
  payment_type: string;
  causes_tags: string[];
  skills: string[];
  experience_level: number;
  job_category_id: string;
  payment_scheme: string;
  city: string;
  payment_currency: string;
};

const initialState: CreatePostWizard = {
  title: '',
  description: '',
  remote_preference: '',
  country: '',
  project_type: '',
  project_length: '',
  payment_type: '',
  causes_tags: [],
  skills: [],
  status: 'ACTIVE',
  experience_level: 0,
  job_category_id: '',
  payment_scheme: '',
  city: '',
  payment_currency: '',
};

export const createPostWizardSlice = createSlice({
  name: 'create-post-wizard',
  initialState,
  reducers: {
    setPostTitle: (state, action) => {
      state.title = action.payload;
    },
    setPostDescriptionTitle: (state, action) => {
      state.description = action.payload;
    },
    setPostRemotePreference: (state, action) => {
      state.remote_preference = action.payload;
    },
    setPostCountry: (state, action) => {
      state.country = action.payload;
    },
    setPostProjectType: (state, action) => {
      state.project_type = action.payload;
    },
    setPostProjectLength: (state, action) => {
      state.project_length = action.payload;
    },
    setPostPaymentType: (state, action) => {
      state.payment_type = action.payload;
    },
    setPostCausesTags: (state, action) => {
      state.causes_tags = action.payload;
    },
    setPostSkills: (state, action) => {
      state.skills = action.payload;
    },
    setPostStatus: (state, action) => {
      state.status = action.payload;
    },
    setPostExperienceLevel: (state, action) => {
      state.experience_level = action.payload;
    },
    setPostJobCategoryId: (state, action) => {
      state.job_category_id = action.payload;
    },
    setPostPaymentScheme: (state, action) => {
      state.payment_scheme = action.payload;
    },
    setPostCity: (state, action) => {
      state.city = action.payload;
    },
    setPostPaymentCurrency: (state, action) => {
      state.payment_currency = action.payload;
    },
    resetCreatePostWizard: () => {
      return initialState;
    },
  },
});

export const {
  setPostTitle,
  setPostDescriptionTitle,
  setPostRemotePreference,
  setPostCountry,
  setPostProjectType,
  setPostProjectLength,
  setPostPaymentType,
  setPostCausesTags,
  setPostSkills,
  setPostStatus,
  setPostExperienceLevel,
  setPostJobCategoryId,
  setPostPaymentScheme,
  setPostCity,
  setPostPaymentCurrency,
  resetCreatePostWizard,
} = createPostWizardSlice.actions;
