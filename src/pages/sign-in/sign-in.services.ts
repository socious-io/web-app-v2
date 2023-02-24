import { post } from '../../core/http';
import { LoginResp } from '../../core/types';
import { LoginPayload } from './sign-in.types';

export async function login(payload: LoginPayload): Promise<LoginResp> {
  return post('auth/web/login', payload).then(({ data }) => data);
}
