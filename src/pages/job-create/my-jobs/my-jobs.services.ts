import { GetJobs, Pagination } from '../../../core/types';
import { get } from '../../../core/http';
import { JobCardProps } from '../../../components/molecules/job-card/job-card.types';
import { isoToStandard } from '../../../core/time';

export async function getActiveJobs(payload: {
  identityId: string;
  page: number;
}): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=ACTIVE&page=${payload.page}`).then(
    ({ data }) => data
  );
}

export async function getDraftJobs(payload: {
  identityId: string;
  page: number;
}): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=DRAFT&page=${payload.page}`).then(
    ({ data }) => data
  );
}

function jobToJobCardAdaptor(job: GetJobs): JobCardProps {
  return {
    id: job.id,
    title: job.title,
    body: `${job.applicants} applicant`,
    date: isoToStandard(job.updated_at),
  };
}

export function jobListToJobCardListAdaptor(jobs: GetJobs[]): JobCardProps[] {
  return jobs.map((job) => jobToJobCardAdaptor(job));
}
