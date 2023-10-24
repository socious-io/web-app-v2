import { job, jobApplicants, jobMissions, jobOffers, jobQuestions } from 'src/core/api';

import { Applicant } from '../../components/molecules/applicant-list/applicant-list.types';
import { Applicant as ApplicantHire } from '../../components/molecules/applicant-list-pay/applicant-list-pay.types';
import { translatePaymentTerms } from '../../constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from '../../constants/PROJECT_PAYMENT_TYPE';
import { isoToStandard } from '../../core/time';
import { ApplicantResp, MissionsResp, Pagination, UserApplicantResp } from '../../core/types';
import { getJobCategories } from '../job-create/info/info.services';

export async function jobOfferRejectLoader({ params }: { params: { id: string } }) {
  const requests = [
    jobOffers(params.id),
    job(params.id),
    jobQuestions(params.id),
    jobApplicants(params.id, { page: 1, status: 'PENDING', limit: 100 }),
    jobApplicants(params.id, { page: 1, status: 'REJECTED', limit: 100 }),
    jobMissions(params.id, { page: 1, 'filter.status': 'ACTIVE,COMPLETE', limit: 100 }),
    jobMissions(params.id, { page: 1, 'filter.status': 'CONFIRMED,CANCELED,KICKED_OUT', limit: 100 }),
    jobOffers(params.id, { page: 1, status: 'PENDING' }),
    jobOffers(params.id, { page: 1, status: 'APPROVED' }),
    jobOffers(params.id, { page: 1, status: 'HIRED' }),
    jobOffers(params.id, { page: 1, status: 'CLOSED,CANCELED,WITHDRAWN' }),
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
      showFeedback: item?.org_feedback === null,
      projectId: item?.project.id,
    };
  });
}
