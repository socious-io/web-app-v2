import { post, get } from 'src/core/api/http';
import { ApplicantsRes, JobsRes, MissionsRes, OffersRes } from 'src/core/api/jobs/jobs.types';
import { FilterReq, PaginateReq, SuccessRes } from 'src/core/api/types';

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
  Badges,
  ImpactPoints,
  ExperienceReq,
  UserProfile,
  EducationsReq,
  Education,
  Preference,
  ImportRes,
} from './users.types';

export async function profile(): Promise<User> {
  return (await get<User>('user/profile')).data;
}

export async function otherProfile(id: string): Promise<User> {
  return (await get<User>(`user/${id}/profile`)).data;
}

export async function badges(id?: string): Promise<Badges> {
  return (await get<Badges>(id ? `user/${id}/badges` : 'user/badges')).data;
}

export async function impactPoints(params?: FilterReq): Promise<ImpactPoints> {
  return (await get<ImpactPoints>(`user/impact-points`, { params })).data;
}

export async function otherProfileByUsername(username: string): Promise<UserProfile> {
  return (await get<UserProfile>(`user/by-username/${username}/profile`)).data;
}

export async function report(identityId: string, payload: ReportReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/${identityId}/report`, payload)).data;
}

export async function recommend(): Promise<User[]> {
  return (await get<User[]>('user/recommend')).data;
}

export async function updateProfile(payload: UpdateProfileReq): Promise<User> {
  return (await post<User>('user/update/profile', payload)).data;
}

export async function updateWallet(payload: UpdateWalletReq): Promise<User> {
  return (await post<User>('user/update/wallet', payload)).data;
}

export async function openToWork(): Promise<boolean> {
  return (await post<{ open_to_work: boolean }>('user/open-to-work', {})).data.open_to_work;
}

export async function openToVolunteer(): Promise<boolean> {
  return (await post<{ open_to_volunteer: boolean }>('user/open-to-volunteer', {})).data.open_to_volunteer;
}

export async function addLanguage(payload: LanguageReq): Promise<Language> {
  return (await post<Language>('user/languages', payload)).data;
}

export async function updateLanguage(id: string, payload: LanguageReq): Promise<Language> {
  return (await post<Language>(`user/languages/update/${id}`, payload)).data;
}

export async function removeLanguage(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/languages/remove/${id}`, {})).data;
}

export async function addExperiences(payload: ExperienceReq): Promise<Experience> {
  return (await post<Experience>('user/experiences', payload)).data;
}

export async function updateExperiences(id: string, payload: ExperienceReq): Promise<Experience> {
  return (await post<Experience>(`user/experiences/update/${id}`, payload)).data;
}

export async function removeExperiences(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/experiences/remove/${id}`, {})).data;
}

export async function addEducations(payload: EducationsReq): Promise<Education> {
  return (await post<Education>('user/educations', payload)).data;
}

export async function updateEducations(id: string, payload: EducationsReq): Promise<Education> {
  return (await post<Education>(`user/educations/update/${id}`, payload)).data;
}

export async function removeEducations(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/educations/remove/${id}`, {})).data;
}

export async function changePassword(payload: ChangePasswordReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/change-password`, payload)).data;
}

export async function changePasswordDirect(payload: ChangePasswordDirectReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/change-password-direct`, payload)).data;
}

export async function selfDelete(payload: DeleteUserReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`user/delete`, payload)).data;
}

export async function userPaidMissions(params: FilterReq): Promise<MissionsRes> {
  return (await get<MissionsRes>('/user/missions', { params })).data;
}

export async function userMissions(id?: string, params?: FilterReq): Promise<MissionsRes> {
  const path = id ? `/user/${id}/missions` : '/user/missions';
  return (await get<MissionsRes>(path, { params })).data;
}

export async function userOffers(params: PaginateReq): Promise<OffersRes> {
  return (await get<OffersRes>(`user/offers`, { params })).data;
}

export async function userApplicants(params: FilterReq): Promise<ApplicantsRes> {
  return (await get<ApplicantsRes>(`user/applicants`, { params })).data;
}

export async function recommendedJobs(username: string, params?: PaginateReq): Promise<JobsRes> {
  return (await get<JobsRes>(`user/${username}/recommend/jobs`, { params })).data;
}

export async function preferences(): Promise<Preference[]> {
  return (await get<Preference[]>('preferences', {})).data;
}

export async function updatePreferences(payload: { preferences: Preference[] }): Promise<Preference[]> {
  return (await post<Preference[]>('preferences', payload)).data;
}

export async function importLinkedin(file: File): Promise<ImportRes> {
  const formData = new FormData();
  formData.append('file', file);
  return (await post<ImportRes>('user/imports/linkdin', formData)).data;
}
