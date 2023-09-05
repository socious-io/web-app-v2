import { get, post } from '../../core/http';
import { isoToStandard } from '../../core/time';
import {
  ApplicantResp,
  MissionsResp,
  Offer,
  OfferPayload,
  Pagination,
  QuestionsRes,
  UserApplicantResp,
} from '../../core/types';
import { Applicant } from '../../components/molecules/applicant-list/applicant-list.types';
import { Applicant as ApplicantHire } from '../../components/molecules/applicant-list-pay/applicant-list-pay.types';
import { Job } from '../../components/organisms/job-list/job-list.types';
import { endpoint } from '../../core/endpoints';
import { translatePaymentTerms } from '../../constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from '../../constants/PROJECT_PAYMENT_TYPE';
import { getJobCategories } from '../job-create/info/info.services';

export async function jobOfferRejectLoader({ params }: { params: { id: string } }) {
  const requests = [
    getOfferOverview(params.id),
    getJobOverview(params.id),
    getScreeningQuestions(params.id),
    getToReviewList({ id: params.id, page: 1 }),
    getDeclinedList({ id: params.id, page: 1 }),
    getHiredList({ id: params.id, page: 1 }),
    getEndHiredList({ id: params.id, page: 1 }),
    endpoint.get.projects['{project_id}/offers']({ id: params.id, page: 1, status: 'PENDING' }),
    endpoint.get.projects['{project_id}/offers']({ id: params.id, page: 1, status: 'APPROVED' }),
    endpoint.get.projects['{project_id}/offers']({ id: params.id, page: 1, status: 'HIRED' }),
    endpoint.get.projects['{project_id}/offers']({ id: params.id, page: 1, status: 'CLOSED,CANCELED,WITHDRAWN' }),
    getJobCategories(),
  ];
  const [
    offerOverview,
    jobOverview,
    screeningQuestions,
    reviewList,
    declinedList,
    hiredList,
    endHiredList,
    sent,
    approved,
    hired,
    closed,
    jobCategories,
  ] = await Promise.all(requests);
  return {
    offerOverview,
    jobOverview,
    screeningQuestions,
    reviewList,
    declinedList,
    hiredList,
    endHiredList,
    sent,
    approved,
    hired,
    closed,
    jobCategories,
  };
}

export async function getOfferOverview(id: string): Promise<Offer> {
  return get(`projects/${id}/offers`).then(({ data }) => data?.items[0]);
}

export async function getJobOverview(id: string): Promise<Job> {
  return get(`projects/${id}`).then(({ data }) => {
    return data;
  });
}

export async function getToReviewList(payload: { id: string; page: number }): Promise<Pagination<UserApplicantResp[]>> {
  return get(`projects/${payload.id}/applicants?limit=100&status=PENDING&page=${payload.page}`).then(
    ({ data }) => data
  );
}

export async function getDeclinedList(payload: { id: string; page: number }): Promise<Pagination<UserApplicantResp[]>> {
  return get(`projects/${payload.id}/applicants?limit=100&status=REJECTED&page=${payload.page}`).then(
    ({ data }) => data
  );
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
      user_id: item.user.id,
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

export function missionToApplicantListPayAdaptor(mission: MissionsResp['items']): ApplicantHire[] {
  if (mission.length === 0) {
    return [];
  }
  return mission.map((item) => {
    return {
      id: item.id,
      name: item.assignee.meta.name,
      image: item.assignee.meta.avatar,
      hireDate: isoToStandard(item.created_at),
      category: item.job_category.name,
      status: item.status,
      paymentMode: translatePaymentTerms(item.project.payment_scheme),
      paymentType: translatePaymentType(item.project.payment_type),
      totalHour: item.offer.total_hours,
      totalMission: `${item.offer.assignment_total} USD`,
      payment: item.payment,
      user_id: item.assignee.meta.id,
      user_feedback: item?.user_feedback,
      showFeedback: !item?.org_feedback?.content,
    };
  });
}

export async function archiveJob(projectId: string) {
  return post(`/projects/update/${projectId}/close`, {});
}
