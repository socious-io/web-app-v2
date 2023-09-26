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
import { SuccessRes } from '../types';

export async function login(payload: LoginReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/login', payload)).data;
}

export async function refresh(payload: RefreshReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/refresh', payload)).data;
}

export async function preRegister(payload: PreRegisterReq): Promise<PreRegisterRes> {
  return (await post<PreRegisterRes>('auth/preregister', payload)).data;
}

export async function register(payload: RegisterReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/register', payload)).data;
}

export async function otp(payload: OtpReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/otp', payload)).data;
}

export async function resendVerifyCode(payload: OtpReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/resend-verify-code', payload)).data;
}

export async function otpConfirm(params: OtpConfirmReq): Promise<AuthRes> {
  return (await get<AuthRes>('auth/otp/confirm', { params })).data;
}

export async function stripeLink(params: AuthStripeReq): Promise<StripeLinkRes> {
  return (await get<StripeLinkRes>('auth/stripe/connect-link', { params })).data;
}

export async function stripeProfile(params: SrtipeProfileReq): Promise<StripeProfileRes> {
  return (await get<StripeProfileRes>('auth/stripe/profile', { params })).data;
}
