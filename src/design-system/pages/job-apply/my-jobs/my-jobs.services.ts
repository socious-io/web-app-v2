import { toRelativeTime } from './../../../../core/relative-time';
import {
  AwaitingReviewApplicantListResp,
  Pagination,
  UserApplicantResp,
  DeclinedApplicantListResp,
  MissionsResp,
} from './../../../../core/types';
import { get } from '../../../../core/http';
import { JobCardProps } from '../../../molecules/job-card/job-card.types';

export async function getEndedList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/missions?status=COMPLETE,CONFIRMED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = endedListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getOnGoingList(payload: {
  page: number;
}): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/missions?status=ACTIVE&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = onGoingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getDeclinedApplicants(payload: {
  page: number;
}): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/applicants?status=REJECTED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = declinedListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getPendingApplicants(payload: {
  page: number;
}): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/applicants?status=PENDING&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = pendingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getAwaitingReviewList(payload: {
  page: number;
}): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/offers?status=PENDING,APPROVED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = awaitingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

function endedItemToJobCardAdaptor(applicant: MissionsResp['items'][0]): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.assigner.meta.name,
    img: applicant.assigner.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function endedListToJobCardList(applicants: MissionsResp['items']): JobCardProps[] {
  return applicants.map(endedItemToJobCardAdaptor);
}

function onGoingItemToJobCardAdaptor(applicant: MissionsResp['items'][0]): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.assigner.meta.name,
    img: applicant.assigner.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function onGoingListToJobCardList(applicants: MissionsResp['items']): JobCardProps[] {
  return applicants.map(onGoingItemToJobCardAdaptor);
}

function declinedItemToJobCardAdaptor(
  applicant: DeclinedApplicantListResp['items'][0]
): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function declinedListToJobCardList(applicants: DeclinedApplicantListResp['items']): JobCardProps[] {
  return applicants.map(declinedItemToJobCardAdaptor);
}

function awaitingItemToJobCardAdaptor(
  applicant: AwaitingReviewApplicantListResp['items'][0]
): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.offerer.meta.name,
    img: applicant.offerer.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function awaitingListToJobCardList(
  applicants: AwaitingReviewApplicantListResp['items']
): JobCardProps[] {
  return applicants.map(awaitingItemToJobCardAdaptor);
}

function pendingItemToJobCard(applicant: UserApplicantResp): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function pendingListToJobCardList(applicants: UserApplicantResp[]): JobCardProps[] {
  return applicants.map(pendingItemToJobCard);
}
