import { jobs, JobsRes } from 'src/core/api';

export async function getOrganizationJobs(payload: { identityId: string; page: number }): Promise<JobsRes> {
  return jobs({ identity_id: payload.identityId, status: 'ACTIVE', page: payload.page, limit: 15 });
}
