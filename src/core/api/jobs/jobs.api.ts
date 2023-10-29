import { ApplicantResp, QuestionsRes } from 'src/core/types';

import {
  JobCategoriesRes,
  Job,
  JobReq,
  JobsRes,
  QuestionReq,
  Question,
  OffersRes,
  MissionsRes,
  ApplicantsRes,
  ApplyReq,
  Applicant,
  OfferReq,
  Offer,
  Mission,
  HourlyWorkReq,
} from './jobs.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq, FilterReq } from '../types';

export async function jobCategories(): Promise<JobCategoriesRes> {
  return (await get<JobCategoriesRes>('projects/categories')).data;
}

export async function jobs(params: FilterReq): Promise<JobsRes> {
  return (await get<JobsRes>('projects', { params })).data;
}

export async function job(id: string): Promise<Job> {
  return (await get<Job>(`projects/${id}`)).data;
}

export async function jobOffers(id: string, params?: FilterReq): Promise<OffersRes> {
  return (await get<OffersRes>(`projects/${id}/offers`, { params })).data;
}

export async function jobMissions(id: string, params: PaginateReq): Promise<MissionsRes> {
  return (await get<MissionsRes>(`projects/${id}/missions`, { params })).data;
}

export async function jobApplicants(id: string, params: PaginateReq): Promise<ApplicantsRes> {
  return (await get<ApplicantsRes>(`projects/${id}/applicants`, { params })).data;
}

export async function createJob(payload: JobReq): Promise<Job> {
  return (await post<Job>('projects', payload)).data;
}

export async function updateJob(id: string, payload: JobReq): Promise<Job> {
  return (await post<Job>(`projects/update/${id}`, payload)).data;
}

export async function closeJob(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`projects/update/${id}/close`, {})).data;
}

export async function addQuestionJob(jobId: string, payload: QuestionReq): Promise<Question> {
  return (await post<Question>(`projects/${jobId}/questions`, payload)).data;
}

export async function jobQuestions(jobId: string): Promise<QuestionsRes> {
  return (await get<QuestionsRes>(`projects/${jobId}/questions`)).data;
}

export async function updateQuestionJob(jobId: string, questionId: string, payload: QuestionReq): Promise<Question> {
  return (await post<Question>(`projects/update/${jobId}/questions/${questionId}`, payload)).data;
}

export async function removeQuestionJob(jobId: string, questionId: string, payload?: QuestionReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`projects/remove/${jobId}/questions/${questionId}`, payload)).data;
}

export async function applyJob(jobId: string, payload: ApplyReq): Promise<Applicant> {
  return (await post<Applicant>(`projects/${jobId}/applicants`, payload)).data;
}

export async function applicant(id: string): Promise<Applicant> {
  return (await get<Applicant>(`applicants/${id}`)).data;
}

export async function rejectApplicant(id: string): Promise<Applicant> {
  return (await post<Applicant>(`applicants/${id}/reject`, {})).data;
}
export async function getOffer(id: string): Promise<Offer> {
  return (await get<Offer>(`offers/${id}`)).data;
}

export async function getMission(id: string): Promise<Mission> {
  return (await get<Mission>(`missions/${id}`)).data;
}

export async function offer(jobId: string, userId: string, payload: OfferReq): Promise<Offer> {
  return (await post<Offer>(`projects/${jobId}/offer/${userId}`, payload)).data;
}

export async function offerByApplicant(applicantId: string, payload: OfferReq): Promise<Offer> {
  return (await post<Offer>(`applicants/${applicantId}/offer`, payload)).data;
}

// talent side
export async function rejectOffer(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`offers/${id}/withdrawn`, {})).data;
}
// talent side
export async function acceptOffer(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`offers/${id}/approve`, {})).data;
}

// org side
export async function cancelOffer(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`offers/${id}/cancel`, {})).data;
}
// org side
export async function hireOffer(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`offers/${id}/hire`, {})).data;
}

// talent side
export async function cancelMission(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/cancel`, {})).data;
}
// talent side
export async function completeMission(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/complete`, {})).data;
}

// talent side
export async function submitWork(missionId: string, payload: HourlyWorkReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${missionId}/submitworks`, payload)).data;
}

// org side
export async function confirmMission(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/confirm`, {})).data;
}

// org side
export async function confirmWorkMission(missionId: string, workId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${missionId}/confirm/${workId}`, {})).data;
}

// org side
export async function dropMission(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/kickout`, {})).data;
}

export async function feedbackMission(id: string, content?: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/feedback`, { content })).data;
}

export async function contestMission(id: string, content?: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`missions/${id}/contest`, { content })).data;
}
