import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { get } from 'src/core/http';
import { isoToStandard } from 'src/core/time';
import { GetJobs, Pagination } from 'src/core/types';

export async function getActiveJobs(payload: { identityId: string; page: number }): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=ACTIVE&page=${payload.page}`).then(({ data }) => data);
}

export async function getDraftJobs(payload: { identityId: string; page: number }): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=DRAFT&page=${payload.page}`).then(({ data }) => data);
}

export async function getArchivedJobs(payload: { identityId: string; page: number }): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=EXPIRE&page=${payload.page}`).then(({ data }) => data);
}

function jobToJobCardAdaptor(job: GetJobs): JobCardProps {
  const applicantText = job.applicants > 1 ? 'applicants' : 'applicant';
  return {
    id: job.id,
    title: job.title,
    body: `${job.applicants} ${applicantText}, ${job.missions} hired`,
    date: isoToStandard(job.updated_at),
    type: `${translatePaymentType(job.payment_type)} - ${translatePaymentTerms(job.payment_scheme)}`,
  };
}

export function jobListToJobCardListAdaptor(jobs: GetJobs[]): JobCardProps[] {
  return jobs.map((job) => jobToJobCardAdaptor(job));
}
