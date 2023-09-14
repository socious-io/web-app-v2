import { post, get } from '../http';
import { SuccessRes } from '../types';
import {
  ReportReq,
  UpdateProfileReq,
  UpdateWalletReq,
  User,
  LanguageReq,
  Language,
  Experience,
  ChangePasswordReq,
  ChangePasswordDirectReq,
  DeleteUserReq,
} from './users.types';

export async function profile(): Promise<User> {
  const { data } = await get('user/profile');
  return data as User;
}

export async function otherProfile(id: string): Promise<User> {
  const { data } = await get(`user/${id}/profile`);
  return data as User;
}

export async function otherProfileByUsername(username: string): Promise<User> {
  const { data } = await get(`user/by-username/${username}/profile`);
  return data as User;
}

export async function report(identityId: string, payload: ReportReq): Promise<SuccessRes> {
  const { data } = await post(`user/${identityId}/report`, payload);
  return data as SuccessRes;
}

export async function recommend(): Promise<User[]> {
  const { data } = await get('user/recommend');
  return data as User[];
}

export async function updateProfile(payload: UpdateProfileReq): Promise<User> {
  const { data } = await post('user/update/profile', payload);
  return data as User;
}

export async function updateWallet(payload: UpdateWalletReq): Promise<User> {
  const { data } = await post('user/update/wallet', payload);
  return data as User;
}

export async function openToWork(): Promise<Boolean> {
  const { data } = await post('user/open-to-work', {});
  return data.open_to_work as boolean;
}

export async function openToVolunteer(): Promise<Boolean> {
  const { data } = await post('user/open-to-volunteer', {});
  return data.open_to_volunteer as boolean;
}

export async function addLanguage(payload: LanguageReq): Promise<Language> {
  const { data } = await post('user/languages', payload);
  return data as Language;
}

export async function updateLanguage(id: string, payload: LanguageReq): Promise<Language> {
  const { data } = await post(`user/languages/update/${id}`, payload);
  return data as Language;
}

export async function removeLanguage(id: string): Promise<SuccessRes> {
  const { data } = await post(`user/languages/remove/${id}`, {});
  return data as SuccessRes;
}

export async function addExperiences(payload: LanguageReq): Promise<Experience> {
  const { data } = await post('user/experiences', payload);
  return data as Experience;
}

export async function updateExperiences(id: string, payload: LanguageReq): Promise<Experience> {
  const { data } = await post(`user/experiences/update/${id}`, payload);
  return data as Experience;
}

export async function removeExperiences(id: string): Promise<SuccessRes> {
  const { data } = await post(`user/experiences/remove/${id}`, {});
  return data as SuccessRes;
}

export async function chagePassword(payload: ChangePasswordReq): Promise<SuccessRes> {
  const { data } = await post(`user/change-password`, payload);
  return data as SuccessRes;
}

// Note: Need to OTP first then API will alow to use this method
export async function chagePasswordDirect(payload: ChangePasswordDirectReq): Promise<SuccessRes> {
  const { data } = await post(`user/change-password-direct`, payload);
  return data as SuccessRes;
}

export async function selfDelete(payload: DeleteUserReq): Promise<SuccessRes> {
  const { data } = await post(`user/delete`, payload);
  return data as SuccessRes;
}
