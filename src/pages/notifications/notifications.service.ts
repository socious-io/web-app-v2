import { get } from 'src/core/http';

export async function getNotificationList({ page } = { page: 1 }) {
  return get(`notifications?page=${page}`).then(({ data }) => data);
}
