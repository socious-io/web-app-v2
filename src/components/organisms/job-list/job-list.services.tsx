import { convertSnakeCaseToLowerCase } from 'src/core/stringTransformation';
import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { getCountryByShortname } from 'src/constants/COUNTRIES';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { translatePaymentRange } from 'src/constants/PAYMENT_RANGE';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { when } from 'src/core/utils';
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

export function getCategories(job: Job): Array<JSX.Element | string> {
  const list: Array<JSX.Element | string> = [];

  const location = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/pin.svg" />
      {job.city}, {getCountryByShortname(job.country)}
    </>
  );

  const projectType = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/part-time.svg" />
      {translateProjectType(job.project_type)}
    </>
  );

  const projectLength = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/during.svg" />
      {translateProjectLength(job.project_length)}
    </>
  );

  const paymentType = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/heart-blue.svg" />
      {translatePaymentType(job.payment_type)}
    </>
  );

  const paymentRange = () => (
    <>
      <img style={{ marginRight: '2px' }} src={`/icons/${job.payment_type === 'PAID' ? 'paid' : 'time'}.svg`} />
      {
        translatePaymentRange(job.payment_range_lower, job.payment_range_higher, job.payment_type, job.payment_scheme)
          .value
      }
    </>
  );

  const experienceLevel = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/level.svg" />
      {translateExperienceLevel(job.experience_level)}
    </>
  );

  when(job.country, () => list.push(location()));
  when(job.project_type, () => list.push(projectType()));
  when(job.project_length, () => list.push(projectLength()));
  when(job.payment_type, () => list.push(paymentType()));
  when(job.payment_range_lower && job.payment_range_higher, () => list.push(paymentRange()));
  when(job.remote_preference, () => list.push(translateRemotePreferences(job.remote_preference)));
  when(job.experience_level !== undefined, () => list.push(experienceLevel()));

  return list;
}
