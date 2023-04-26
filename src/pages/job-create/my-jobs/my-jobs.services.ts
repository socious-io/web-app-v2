import { get } from 'src/core/http';
import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';
import { Menu } from 'src/components/molecules/card-menu/card-menu.types';
import { GetJobs, Pagination } from 'src/core/types';
import { isoToStandard } from 'src/core/time';

export async function getActiveJobs(payload: { identityId: string; page: number }): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=ACTIVE&page=${payload.page}`).then(({ data }) => data);
}

export async function getDraftJobs(payload: { identityId: string; page: number }): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=DRAFT&page=${payload.page}`).then(({ data }) => data);
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

export const NetworkMenuList: Menu[] = [
  { label: 'Team', icon: '/icons/team.svg' },
  { label: 'Followers', icon: '/icons/followers.svg' },
];

export const JobsMenuList: Menu[] = [
  { label: 'Created', icon: '/icons/folder-black.svg' },
  { label: 'Archived', icon: '/icons/archived.svg' },
];
