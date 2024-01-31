import { register, changePasswordDirect as changePasswordDirectApi, RegisterReq } from 'src/core/api';

export function registerUser(payload: RegisterReq) {
  return register(payload);
}
export function changePasswordDirect(password: string) {
  return changePasswordDirectApi({ password });
}
