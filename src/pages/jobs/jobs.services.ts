import { jobs } from 'src/core/api';

export async function getJobList({ page } = { page: 1 }) {
  return jobs({ page, status: 'ACTIVE' });
}
