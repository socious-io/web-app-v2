import { get } from '../../../core/http';
import { convertSnakeCaseToLowerCase } from '../../../core/stringTransformation';
import { Job } from '../../organisms/job-list/job-list.types';

export async function getJobDetail(id: string): Promise<Job> {
  return get(`projects/${id}`).then(({ data }) => data);
}

export function getCategories(job: Job): Array<JSX.Element | string> {
  const location = (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/pin.svg" />
      {job.city}, {job.country}
    </>
  );
  const type = (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/part-time.svg" />
      {convertSnakeCaseToLowerCase(job.project_type)}
    </>
  );
  const length = (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/time.svg" />
      {convertSnakeCaseToLowerCase(job.project_length)}
    </>
  );
  return [location, type, convertSnakeCaseToLowerCase(job.remote_preference), length];
}

function convertCausesToLowerCase(causes: string[]): string[] {
  return causes.map((cause) => {
    return convertSnakeCaseToLowerCase(cause);
  });
}

export function toLowerCase(causes_tags: string[]): string[] {
  return convertCausesToLowerCase(causes_tags);
}
