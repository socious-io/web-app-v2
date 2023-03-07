import { Cookie } from '../../core/storage';
import { get, post } from '../../core/http';

export async function logout() {
  Cookie.flush();
  return post(`/auth/logout`, {}).then(({ data }) => data);
}

export function getSession(accountId: string) {
  Cookie.add({ identity: accountId });
}
