import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import { post } from 'src/core/http';
import { CreatePostPayload, CreateQuestionPayload } from 'src/core/types';
import {
  setChoices,
  setQuestionType,
  setQuestions,
  setRequiredQuestion,
} from 'src/store/reducers/createQuestionWizard.reducer';

import { formModel } from './screener-questions.form';


export const QUESTION_TYPE = [
  { value: 'TEXT', label: 'Text' },
  { value: 'MULTIPLE', label: 'Multiple choices' },
];

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
}

export async function updateQuestion(payload: CreateQuestionPayload, project_id: string, question_id: string) {
  return post(`/projects/update/${project_id}/questions/${question_id}`, payload).then(({ data }) => data);
}

export function updateForm(dispatch: Dispatch<AnyAction>) {
  return (fieldName: keyof ReturnType<typeof formModel>, value: ControlPrimitiveValue) => {
    const field: Record<string, () => void> = {
      question_type: () => dispatch(setQuestionType(value)),
      question: () => dispatch(setQuestions(value)),
      required_question: () => dispatch(setRequiredQuestion(value)),
    };
    field[fieldName]();
  };
}
export async function createQuestion(payload: CreateQuestionPayload, project_id: string) {
  return post(`/projects/${project_id}/questions`, payload).then(({ data }) => data);
}
export const convertOptionsToChoices = (array) =>
  array.reduce((obj, value, index) => {
    obj[index + 1] = value;
    return obj;
  }, {});
