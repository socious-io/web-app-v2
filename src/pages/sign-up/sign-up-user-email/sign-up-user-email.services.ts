import { post } from '../../../core/http';

export async function preRegister(payload: { email: string }) {
  return post('auth/register', payload);
}
