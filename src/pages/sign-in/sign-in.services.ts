import { post } from '../../core/http';
import { LoginPayload } from './sign-in.types';

export async function login(payload: LoginPayload): Promise<boolean> {
  return post('auth/web/login', payload).then((resp) => {
    return resp.data.message === 'success';
  });
}
