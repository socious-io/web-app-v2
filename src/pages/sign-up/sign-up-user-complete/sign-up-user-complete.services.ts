import { post } from '../../../core/http';
import { RegisterPayload } from './sign-up-user-complete.types';

export function registerUser(payload: RegisterPayload) {
  return post('auth/register', payload);
}
