import { get, post } from 'src/core/api/http';

import {
  ClaimVCRes,
  CredentialExperienceRes,
  CredentialExperiencePaginateRes,
  RequestVerificationRes,
  RequestVerificationStatusRes,
  CredentialEducationRes,
  CredentialEducationPaginateRes,
  OrgRequestVerificationRes,
} from './credentials.types';
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

export async function requestVerifyEducation(
  educationId: string,
  message?: string,
  exact_info?: boolean,
): Promise<CredentialEducationRes> {
  return (await post<CredentialEducationRes>(`/credentials/educations/${educationId}`, { message, exact_info })).data;
}

export async function approveVerifyEducation(verifyRequestId: string): Promise<CredentialEducationRes> {
  return (await post<CredentialEducationRes>(`/credentials/educations/${verifyRequestId}/approve`, {})).data;
}

export async function rejectVerifyEducation(verifyRequestId: string): Promise<CredentialEducationRes> {
  return (await post<CredentialEducationRes>(`/credentials/educations/${verifyRequestId}/reject`, {})).data;
}

export async function claimEducationVC(verifyRequestId: string): Promise<ClaimVCRes> {
  return (await post<ClaimVCRes>(`/credentials/educations/${verifyRequestId}/claim`, {})).data;
}

export async function getRequestedVerifyEducations(params: PaginateReq): Promise<CredentialEducationPaginateRes> {
  return (await get<CredentialEducationPaginateRes>(`/credentials/educations`, { params })).data;
}

export async function requestVerification(): Promise<RequestVerificationRes> {
  return (await post<RequestVerificationRes>(`/credentials/verifications`, {})).data;
}

export async function checkVerification(): Promise<RequestVerificationStatusRes> {
  return (await get<RequestVerificationStatusRes>(`/credentials/verifications`, {})).data;
}

export async function requestOrgVerification(documents: string[]): Promise<OrgRequestVerificationRes> {
  return (await post<OrgRequestVerificationRes>(`/credentials/verifications/org`, { documents })).data;
}
