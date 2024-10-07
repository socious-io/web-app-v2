import { createSlice } from '@reduxjs/toolkit';
import { Education, Experience, Language } from 'src/core/api';

interface LinkedInState {
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  isImportingLinkedIn: boolean;
}

const initialState = {
  experiences: [],
  educations: [],
  languages: [],
  isImportingLinkedIn: false,
} as LinkedInState;

export const linkedInSlice = createSlice({
  name: 'linkedin',
  initialState,
  reducers: {
    setLinkedIn: (state, action) => {
      state.isImportingLinkedIn = true;
      Object.assign(state, action.payload);
    },
  },
});

export const { setLinkedIn } = linkedInSlice.actions;
