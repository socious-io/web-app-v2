import { createSlice } from '@reduxjs/toolkit';
import { Skill } from 'src/core/api';

interface SkillsState {
  items: Skill[];
}
const initialState = {
  items: [],
} as SkillsState;
export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setSkills } = skillsSlice.actions;
