import { get, post } from '../../../core/http';
import { isoToStandard } from '../../../core/time';
import { ApplicantResp, MissionsResp, OfferPayload, Pagination, QuestionsRes, UserApplicantResp } from '../../../core/types';
import { Applicant } from '../../molecules/applicant-list/applicant-list.types';
import { Job } from '../../organisms/job-list/job-list.types';

export async function getJobOverview(id: string): Promise<Job> {
  return get(`projects/${id}`).then(({ data }) => data);
}

export async function getToReviewList(payload: { id: string; page: number }): Promise<Pagination<UserApplicantResp[]>> {
  return get(`projects/${payload.id}/applicants?limit=100&status=PENDING&page=${payload.page}`).then(({ data }) => data);
}

export async function getDeclinedList(payload: { id: string; page: number }): Promise<Pagination<UserApplicantResp[]>> {
  return get(`projects/${payload.id}/applicants?limit=100&status=REJECTED&page=${payload.page}`).then(({ data }) => data);
}

export async function getHiredList(payload: { id: string; page: number }): Promise<MissionsResp> {
  return get(`projects/${payload.id}/missions?limit=100&filter.status=ACTIVE,COMPLETE&page=${payload.page}`).then(
    ({ data }) => data
  );
}

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return get(`projects/${id}/questions`).then(({ data }) => data);
}

export async function getEndHiredList(payload: { id: string; page: number }): Promise<MissionsResp> {
  return get(
    `projects/${payload.id}/missions?limit=100&filter.status=CONFIRMED,CANCELED,KICKED_OUT&page=${payload.page}`
  ).then(({ data }) => data);
}

export async function getApplicantDetail(applicantId: string): Promise<ApplicantResp> {
  return get(`/applicants/${applicantId}`).then(({ data }) => data);
}

export async function rejectApplicant(id: string): Promise<ApplicantResp> {
  return post(`/applicants/${id}/reject`, {}).then(({ data }) => data);
}

export function applicantToApplicantListAdaptor(applicant: UserApplicantResp[]): Applicant[] {
  if (applicant.length === 0) {
    return [];
  }
  return applicant.map((item) => {
    return {
      id: item.id,
      name: item.user.name,
      image: item.user.avatar,
      profileLink: '',
      applyDate: isoToStandard(item.created_at),
      coverLetter: item.cover_letter,
      status: item.status,
    };
  });
}

export function offer(id: string, payload: OfferPayload) {
  return post(`/applicants/${id}/offer`, payload);
}

export function missionToApplicantListAdaptor(mission: MissionsResp['items']): Applicant[] {
  if (mission.length === 0) {
    return [];
  }
  return mission.map((item) => {
    return {
      id: item.id,
      name: item.assignee.meta.name,
      image: item.assignee.meta.avatar,
      profileLink: '',
      applyDate: isoToStandard(item.created_at),
      coverLetter: item.applicant?.cover_letter,
    };
  });
}
