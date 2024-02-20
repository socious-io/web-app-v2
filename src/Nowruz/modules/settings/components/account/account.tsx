import { selfDelete } from 'src/core/api';
import { login as loginApi } from 'src/core/api';

export async function login(email: string, password: string) {
  return loginApi({ email, password });
}

export async function deleteAccount(reason = 'unknown') {
  const body = {
    reason,
  };
  return selfDelete(body);
}
