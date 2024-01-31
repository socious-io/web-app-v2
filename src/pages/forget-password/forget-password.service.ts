import { changePasswordDirect, forgetPassword as forgetPasswordApi, otpConfirm } from 'src/core/api';

export async function forgetPassword(email: string) {
  const body = {
    email,
  };
  return forgetPasswordApi(body);
}

export async function confirm(email: string, code: string) {
  return otpConfirm({ email, code });
}

export async function changePassword(password: string) {
  const body = {
    password,
  };
  return changePasswordDirect(body);
}
