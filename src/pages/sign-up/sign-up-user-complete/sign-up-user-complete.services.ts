import { RegisterPayload } from './sign-up-user-complete.types';
import { post } from '../../../core/http';

export function registerUser(payload: RegisterPayload) {
  return post('auth/register', payload);
}
export function changePasswordDirect(password: string) {
  return post('user/change-password-direct', { password }).then(({ data }) => data);
}
