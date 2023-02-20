import { RadioGroupProps, RadioGroup } from '@mui/material';
import { get, post } from '../../../core/http';
import { QuestionsRes } from '../../../core/types';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { ApplyApplicationPayload, Resume } from './apply.types';

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return get(`projects/${id}/questions`).then(({ data }) => data);
}

export async function applyApplication(id: string, payload: ApplyApplicationPayload): Promise<unknown> {
  const clone = { cover_letter: payload.cover_letter };
  if (payload.cv_link !== '') {
    Object.assign(clone, { cv_link: payload.cv_link });
  }
  if (payload.cv_name !== '') {
    Object.assign(clone, { cv_name: payload.cv_name });
  }
  return post(`/projects/${id}/applicants`, clone);
}

const convertOptionsToRadioGroup = (options: QuestionsRes['options']): RadioGroupProps['list'] => {
  return (options as string[]).map((option) => {
    return { label: option, value: option };
  });
};

async function uploadResume(file: File): Promise<{ id: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const header = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  return post('/media/upload', formData, header).then(({ data }) => data);
}

export async function submit(id: string, file: File, payload: ApplyApplicationPayload) {
  const uploadedResume = await uploadResume(file);
  const clonePayload = { ...payload };
  clonePayload.attachment = uploadedResume.id;
  return applyApplication(id, clonePayload);
}

export function createTextQuestion(question: QuestionsRes, i: number): JSX.Element {
  return (
    <div>
      <Textarea optional placeholder="Your answer..." label={`${i}. ${question.question}`} />
    </div>
  );
}

export function createRadioQuestion(question: QuestionsRes, i: number): JSX.Element {
  return (
    <RadioGroup
      label={`${i}. ${question.question}`}
      list={convertOptionsToRadioGroup(question.options)}
      value=""
      name="radio"
      onChange={console.log}
    />
  );
}

export const resumeInitialState: Resume = {
  name: '',
  file: null,
};
