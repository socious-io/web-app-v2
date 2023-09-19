import { post, get } from '../http';
import { SuccessRes, PaginateReq } from '../types';
import { JobCategoriesRes, Job, JobReq, JobsRes, QuestionReq, Question } from './jobs.types';
import { QuestionsRes } from 'src/core/types';

export async function jobCategories(): Promise<JobCategoriesRes> {
  return (await get<JobCategoriesRes>('projects/categories')).data;
}

export async function jobs(params: PaginateReq): Promise<JobsRes> {
  return (await get<JobsRes>('projects', { params })).data;
}

export async function job(id: string): Promise<Job> {
  return (await get<Job>(`projects/${id}`)).data;
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

export async function removeQuestionJob(jobId: string, questionId: string, payload: QuestionReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`projects/remove/${jobId}/questions/${questionId}`, payload)).data;
}
