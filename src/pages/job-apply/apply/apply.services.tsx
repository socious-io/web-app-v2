import { RadioGroupProps } from 'src/components/molecules/radio-group/radio-group.types';
import { applyJob, jobQuestions, uploadMedia } from 'src/core/api';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { QuestionsRes } from 'src/core/types';

import { ApplyApplicationPayload, Resume } from './apply.types';

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return jobQuestions(id);
}

export async function applyApplication(id: string, payload: ApplyApplicationPayload): Promise<unknown> {
  return applyJob(id, payload);
}

export const convertOptionsToRadioGroup = (options: null | string[], id: string): RadioGroupProps['list'] => {
  return (options as string[]).map((option) => {
    return { label: option, value: `${id}-${option}` };
  });
};

async function uploadResume(file: File): Promise<{ id: string }> {
  return uploadMedia(file);
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
    { answers: [] },
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
