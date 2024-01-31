import { createSlice } from '@reduxjs/toolkit';
import { convertOptionsToChoices } from 'src/pages/job-edit/screener-questions/screener-questions.service';

export type CreatedQuestionsType = {
  id: string;
  type: 'TEXT' | 'MULTIPLE';
  question: string;
  required: boolean;
  options: string[];
};

const initialQuestionsState = {
  question_type: 'TEXT',
  question: '',
  required_question: false,
  add_choices: 0,
  choices: {},
};

export type CreateQuestionWizard = {
  add_question: boolean;
  question_type: 'TEXT' | 'MULTIPLE';
  question: string;
  required_question: boolean;
  add_choices: number;
  choices: { [x: string]: string };
  created_questions: CreatedQuestionsType[];
  question_project_id: { project_id: string; question_id: string; identity_id: string };
};

const initialState: CreateQuestionWizard = {
  add_question: false,
  question_type: 'TEXT',
  question: '',
  required_question: false,
  add_choices: 0,
  choices: {},
  created_questions: [],
  question_project_id: { project_id: '', question_id: '', identity_id: '' },
};

export const createQuestionWizardSlice = createSlice({
  name: 'create-post-wizard',
  initialState,
  reducers: {
    setAddQuestion: (state, action) => {
      state.add_question = action.payload;
    },
    setQuestionType: (state, action) => {
      state.question_type = action.payload;
    },
    setQuestions: (state, action) => {
      state.question = action.payload;
    },
    setRequiredQuestion: (state, action) => {
      state.required_question = action.payload;
    },
    setAddChoices: (state, action) => {
      state.add_choices = action.payload;
    },
    setChoices: (state, action) => {
      state.choices = action.payload;
    },
    setCreatedQuestions: (state, action) => {
      state.created_questions = action.payload;
    },
    setQuestionProjectIds: (state, action) => {
      state.question_project_id = action.payload;
    },
    setDefaultQuestion: (state, action) => {
      console.log('payload', action.payload);
      const { question, options, required } = action.payload;
      console.log('action payload', action.payload.required);
      return {
        ...state,
        question_type: options ? 'MULTIPLE' : 'TEXT',
        choices: options ? convertOptionsToChoices(options) : {},
        add_choices: options ? options.length : 0,
        question,
        options,
        required_question: required,
      };
    },
    resetQuestions: (state) => {
      return { ...state, ...initialQuestionsState } as CreateQuestionWizard;
    },
    resetCreatedQuestion: () => {
      return initialState;
    },
  },
});

export const {
  setAddQuestion,
  setQuestionType,
  setQuestions,
  setRequiredQuestion,
  setAddChoices,
  setChoices,
  setCreatedQuestions,
  setQuestionProjectIds,
  resetQuestions,
  resetCreatedQuestion,
  setDefaultQuestion,
} = createQuestionWizardSlice.actions;
