import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { Job, jobs, JobsRes } from 'src/core/api';
import { isoToStandard } from 'src/core/time';

export async function getActiveJobs(payload: { identityId: string; page: number }): Promise<JobsRes> {
  return jobs({ identity_id: payload.identityId, page: payload.page, status: 'ACTIVE' });
}

export async function getDraftJobs(payload: { identityId: string; page: number }): Promise<JobsRes> {
  return jobs({ identity_id: payload.identityId, page: payload.page, status: 'DRAFT' });
}

export async function getArchivedJobs(payload: { identityId: string; page: number }): Promise<JobsRes> {
  return jobs({ identity_id: payload.identityId, page: payload.page, status: 'EXPIRE' });
}

function jobToJobCardAdaptor(job: Job): JobCardProps {
  const applicantText = job.applicants > 1 ? 'applicants' : 'applicant';
  return {
    id: job.id,
    title: job.title,
    body: `${job.applicants} ${applicantText}, ${job.missions} hired`,
    date: isoToStandard(job.updated_at ? job.updated_at.toString() : ''),
    type: `${translatePaymentType(job.payment_type || '')} - ${translatePaymentTerms(job.payment_scheme || '')}`,
  };
}

export function jobListToJobCardListAdaptor(jobs: Job[]): JobCardProps[] {
  return jobs.map((job) => jobToJobCardAdaptor(job));
}
