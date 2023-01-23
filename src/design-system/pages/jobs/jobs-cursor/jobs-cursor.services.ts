import { get } from '../../../../core/http';
import { Menu } from '../../../molecules/card-menu/card-menu.types';

export const NetworkMenuList: Menu[] = [
  { label: 'Connections', icon: '/icons/network.svg' },
  { label: 'Followers', icon: '/icons/followers.svg' },
];

export const JobsMenuList: Menu[] = [
  { label: 'My applications', icon: '/icons/my-applications.svg' },
  { label: 'Hired jobs', icon: '/icons/hired-jobs.svg' },
];

export async function getJobList({ page } = { page: 1 }) {
  return get(`projects?status=ACTIVE&page=${page}`).then(({ data }) => data);
}
