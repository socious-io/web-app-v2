import { post } from '../../../core/http';

export async function register(payload: { email: string }) {
  return post('auth/register', payload);
}

export async function preRegister(payload: { email: string }) {
  return post('auth/preregister', payload);
}
