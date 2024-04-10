import { get, post } from 'src/core/api/http';

import { ClaimVCRes, CredentialExperienceRes, CredentialExperiencePaginateRes } from './credentials.types';
import { PaginateReq } from '../types';

export async function requestVerifyExperience(
  experienceId: string,
  message?: string,
  exact_info?: boolean,
): Promise<CredentialExperienceRes> {
  return (await post<CredentialExperienceRes>(`/credentials/experiences/${experienceId}`, { message, exact_info }))
    .data;
}

export async function approveVerifyExperience(verifyRequestId: string): Promise<CredentialExperienceRes> {
  return (await post<CredentialExperienceRes>(`/credentials/experiences/${verifyRequestId}/approve`, {})).data;
}

export async function rejectVerifyExperience(verifyRequestId: string): Promise<CredentialExperienceRes> {
  return (await post<CredentialExperienceRes>(`/credentials/experiences/${verifyRequestId}/reject`, {})).data;
}

export async function claimExperienceVC(verifyRequestId: string): Promise<ClaimVCRes> {
  return (await post<ClaimVCRes>(`/credentials/experiences/${verifyRequestId}/claim`, {})).data;
}

export async function getRequestedVerifyExperiences(params: PaginateReq): Promise<CredentialExperiencePaginateRes> {
  return (await get<CredentialExperiencePaginateRes>(`/credentials/experiences`, { params })).data;
}
