import { get } from 'src/core/http';
import { GetJobs, Pagination } from 'src/core/types';

export async function getOrganizationJobs(payload: {
  identityId: string;
  page: number;
}): Promise<Pagination<GetJobs[]>> {
  return get(`/projects?identity_id=${payload.identityId}&status=ACTIVE&page=${payload.page}&limit=15`).then(
    ({ data }) => data
  );
}
