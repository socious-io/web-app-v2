import { get, post } from '../../core/http';

export async function logout() {
  return post(`/auth/logout`, {}).then(({ data }) => data);
}

export async function getSession(accountId: string) {
  return get(`identities/set/${accountId}/session`).then(({ data }) => data);
}
