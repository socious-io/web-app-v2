import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { post } from 'src/core/http';
import { formModel } from './screener-questions.form';
import { setQuestionType, setQuestions, setRequiredQuestion } from 'src/store/reducers/createQuestionWizard.reducer';
import { CreatePostPayload, CreateQuestionPayload } from 'src/core/types';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';

export const QUESTION_TYPE = [
  { value: 'TEXT', label: 'Text' },
  { value: 'MULTIPLE', label: 'Multiple choices' },
];

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
}

export async function createQuestion(payload: CreateQuestionPayload, project_id: string) {
  return post(`/projects/${project_id}/questions`, payload).then(({ data }) => data);
}

export function updateForm(dispatch: Dispatch<AnyAction>) {
  return (fieldName: keyof ReturnType<typeof formModel>, value: ControlPrimitiveValue) => {
    switch (fieldName) {
      case 'question_type':
        dispatch(setQuestionType(value));
        break;
      case 'question':
        dispatch(setQuestions(value));
        break;
      case 'required_question':
        dispatch(setRequiredQuestion(value));
        break;
    }
  };
}
