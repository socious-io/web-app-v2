import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { Job } from './people-list.types';
import { convertSnakeCaseToLowerCase } from 'src/core/stringTransformation';

export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 'no_exp', label: 'No experience' },
  { value: 'entry', label: 'Entry' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];

function convertCausesToLowerCase(causes: string[]): string[] {
  return causes.map((cause) => {
    return convertSnakeCaseToLowerCase(cause);
  });
}

export function getCausesList(causes_tags: string[]): string[] {
  return convertCausesToLowerCase(causes_tags);
}

export function getList(job: Job) {
  return [
    translateProjectType(job.project_type),
    translatePaymentType(job.payment_type),
    translateExperienceLevel(job.experience_level),
  ].filter((item) => item);
}
