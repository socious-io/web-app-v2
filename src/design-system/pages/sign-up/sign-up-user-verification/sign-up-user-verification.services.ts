// https://dev.socious.io/api/v2/auth/otp/confirm/web?email=testazint21est4@gmail.com&code=123212

import { get, post } from '../../../../core/http';

export async function confirmOTP(email: string, otp: string) {
  return get(`auth/otp/confirm/web?email=${email}&code=${otp}`);
}

export async function resendOTP(email: string) {
  return post('auth/resend-verify-code', {email});
}
