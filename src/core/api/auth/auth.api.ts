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
import { post, get } from '../http';
import { CapacitorPlatform, SuccessRes } from '../types';

export async function login(payload: LoginReq, params?: { event_id: string }): Promise<AuthRes> {
  return (await post<AuthRes>('auth/login', payload, { params })).data;
}

export async function logout(): Promise<SuccessRes> {
  return (await post<SuccessRes>(`/auth/logout`, {})).data;
}

export async function refresh(payload: RefreshReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/refresh', payload)).data;
}

export async function preRegister(payload: PreRegisterReq): Promise<PreRegisterRes> {
  return (await post<PreRegisterRes>('auth/preregister', payload)).data;
}

export async function register(payload: RegisterReq, referrer?: string, event_id?: string): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/register', payload, { params: { referred_by: referrer, event_id } })).data;
}

export async function otp(payload: OtpReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/otp', payload)).data;
}

export async function forgetPassword(payload: OtpReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/forget-password', payload)).data;
}

export async function resendVerifyCode(payload: OtpReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/resend-verify-code', payload)).data;
}

export async function otpConfirm(params: OtpConfirmReq): Promise<AuthRes> {
  return (await get<AuthRes>('auth/otp/confirm', { params })).data;
}

export async function getStripeLink(params: AuthStripeReq): Promise<StripeLinkRes> {
  return (await get<StripeLinkRes>('auth/stripe/connect-link', { params })).data;
}

export async function stripeProfile(params: SrtipeProfileReq): Promise<StripeProfileRes> {
  return (await get<StripeProfileRes>('auth/stripe/profile', { params })).data;
}

export async function googleOauth(
  code: string,
  referrer?: string,
  event_id?: string,
  platform?: CapacitorPlatform,
): Promise<AuthRes> {
  return (await get<AuthRes>('auth/google', { params: { code, referrer_by: referrer, event_id, platform } })).data;
}

export async function appleOauth(
  code: string,
  id_token: string,
  referrer?: string,
  event_id?: string,
  platform?: string,
): Promise<AuthRes> {
  return (await get<AuthRes>('auth/apple', { params: { code, id_token, referrer_by: referrer, event_id, platform } }))
    .data;
}
