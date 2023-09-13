import { post, get } from '../http';
import { SuccessRes } from '../types';
import {
  LoginReq,
  PreRegisterReq,
  OtpReq,
  OtpConfirmReq,
  RefreshReq,
  AuthStripeReq,
  RegisterReq,
  SrtipeProfileReq,
  StripeLinkRes,
  StripeProfileRes,
  PreRegisterRes,
  AuthRes,
} from './auth.types';

export async function login(payload: LoginReq): Promise<AuthRes> {
  const { data } = await post('/auth/web/login', payload);
  return data as AuthRes;
}

export async function refresh(payload: RefreshReq): Promise<AuthRes> {
  const { data } = await post('/auth/web/login', payload);
  return data as AuthRes;
}

export async function preRegister(payload: PreRegisterReq): Promise<PreRegisterRes> {
  const { data } = await post('auth/preregister', payload);
  return data as PreRegisterRes;
}

export async function register(payload: RegisterReq): Promise<SuccessRes> {
  const { data } = await post('auth/register', payload);
  return data as SuccessRes;
}

export async function otp(payload: OtpReq): Promise<SuccessRes> {
  const { data } = await post('auth/otp', payload);
  return data as SuccessRes;
}

export async function resendVerifyCode(payload: OtpReq): Promise<SuccessRes> {
  const { data } = await post('auth/resend-verify-code', payload);
  return data as SuccessRes;
}

export async function otpConfirm(payload: OtpConfirmReq): Promise<AuthRes> {
  const { data } = await get('auth/otp/confirm', { params: payload });
  return data as AuthRes;
}

export async function stripeLink(payload: AuthStripeReq): Promise<StripeLinkRes> {
  const { data } = await get('auth/stripe/connect-link', { params: payload });
  return data as StripeLinkRes;
}

export async function stripeProfile(payload: SrtipeProfileReq): Promise<StripeProfileRes> {
  const { data } = await get('auth/stripe/profile', { params: payload });
  return data as StripeProfileRes;
}
