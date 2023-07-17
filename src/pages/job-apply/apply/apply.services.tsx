import { get, post } from 'src/core/http';
import { QuestionsRes } from 'src/core/types';
import { ApplyApplicationPayload, Resume } from './apply.types';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { RadioGroupProps } from 'src/components/molecules/radio-group/radio-group.types';

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return get(`projects/${id}/questions`).then(({ data }) => data);
}

export async function applyApplication(id: string, payload: ApplyApplicationPayload): Promise<unknown> {
  return post(`/projects/${id}/applicants`, payload);
}

export const convertOptionsToRadioGroup = (options: null | string[]): RadioGroupProps['list'] => {
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

export function generatePayload(form) {
  const rawFormValues = getFormValues(form);
  const removedEmpty = Object.entries(rawFormValues).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});

  const props = ['cover_letter', 'cv_link', 'cv_name'];
  const formatted = Object.entries(removedEmpty).reduce(
    (prev, [key, value]) => {
      if (props.includes(key)) {
        Object.assign(prev, { [key]: value });
      } else {
        prev.answers.push({ id: key, answer: value });
      }
      return prev;
    },
    { answers: [] }
  );
  return formatted;
}

export async function submit(id: string, file: File, payload: ApplyApplicationPayload) {
  const uploadedResume = await uploadResume(file);
  const clonePayload = { ...payload };
  clonePayload.attachment = uploadedResume.id;
  return applyApplication(id, clonePayload);
}

export const resumeInitialState: Resume = {
  name: '',
  file: null,
};
