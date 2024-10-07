import { createSlice } from '@reduxjs/toolkit';
import { EducationsReq, ExperienceReq, LanguageReq } from 'src/core/api';

interface LinkedInState {
  experiences: ExperienceReq[];
  educations: EducationsReq[];
  languages: LanguageReq[];
  importedLinkedIn: boolean;
}

const initialState = {
  experiences: [],
  educations: [],
  languages: [],
  importedLinkedIn: false,
} as LinkedInState;

export const linkedInSlice = createSlice({
  name: 'linkedin',
  initialState,
  reducers: {
    setLinkedIn: (state, action) => {
      state.importedLinkedIn = true;
      Object.assign(state, action.payload);
    },
  },
});

export const { setLinkedIn } = linkedInSlice.actions;
