import { convertSnakeCaseToLowerCase } from '../../../core/stringTransformation';
import { Job } from './job-list.types';

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
    convertSnakeCaseToLowerCase(job.project_type),
    convertSnakeCaseToLowerCase(job.payment_type),
    // convertSnakeCaseToLowerCase(EXPERIENCE_LEVEL_OPTIONS[job.experience_level]?.label),
  ];
}
