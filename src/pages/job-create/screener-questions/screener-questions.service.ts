import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { addQuestionJob, createJob, JobReq, QuestionReq } from 'src/core/api';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import { setQuestionType, setQuestions, setRequiredQuestion } from 'src/store/reducers/createQuestionWizard.reducer';

import { formModel } from './screener-questions.form';

export const QUESTION_TYPE = [
  { value: 'TEXT', label: 'Text' },
  { value: 'MULTIPLE', label: 'Multiple choices' },
];

export async function createPost(payload: JobReq) {
  return createJob(payload);
}

export async function createQuestion(payload: QuestionReq, project_id: string) {
  return addQuestionJob(project_id, payload);
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
