import { get } from '../../../core/http';

export async function getUserDetail(username: string) {
  //   return get(`/orgs/by-shortname/${payload.id}`).then(({ data }) => data);
  return get(`/user/by-username/${username}/profile`).then(({ data }) => data);
}

export async function getOrganizationDetail(shortname: string) {
  return get(`/orgs/by-shortname/${shortname}`).then(({ data }) => data);
}
