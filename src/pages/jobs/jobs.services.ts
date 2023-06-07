import { get } from 'src/core/http';

export async function getJobList({ page } = { page: 1 }) {
  return get(`projects?status=ACTIVE&page=${page}`).then(({ data }) => data);
}
