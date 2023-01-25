import { GetJobs, Pagination } from './../../../../core/types';
import { get } from '../../../../core/http';

export async function getActiveJobs(payload: {
  identityId: string;
  page: number;
}): Promise<Pagination<GetJobs>> {
  return get(`/projects?identity_id=${payload.identityId}&status=ACTIVE&page=${payload.page}`).then(
    ({ data }) => data
  );
}

export async function getDraftJobs(payload: {
  identityId: string;
  page: number;
}): Promise<Pagination<GetJobs>> {
  return get(`/projects?identity_id=${payload.identityId}&status=DRAFT&page=${payload.page}`).then(
    ({ data }) => data
  );
}
