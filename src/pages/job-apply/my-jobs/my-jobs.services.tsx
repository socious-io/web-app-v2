import { CSSProperties } from 'react';
import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';
import { get } from 'src/core/http';
import { toRelativeTime } from 'src/core/relative-time';
import { GetOffer, Pagination, UserApplicantResp, DeclinedApplicantListResp, MissionsResp } from 'src/core/types';
import { APPLICANT_STATUS, setApplicantStatusLabel } from 'src/constants/APPLICANT_STATUS';

export async function getEndedList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/missions?status=COMPLETE,CONFIRMED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = endedListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getOnGoingList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/missions?status=ACTIVE&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = onGoingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getDeclinedApplicants(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/applicants?status=REJECTED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = declinedListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getPendingApplicants(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/applicants?status=PENDING&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = pendingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

export async function getAwaitingReviewList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  return get(`/user/offers?status=PENDING,APPROVED&page=${payload.page}`)
    .then(({ data }) => data)
    .then((resp) => {
      const adopted = awaitingListToJobCardList(resp.items);
      return { ...resp, items: adopted };
    });
}

function endedItemToJobCardAdaptor(applicant: MissionsResp['items'][0]): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.assigner.meta.name,
    img: applicant.assigner.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
    bottomRight: setStatusJSX("COMPLETED"),
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
    bottomRight: setStatusJSX("CONFIRMED"),
  };
}

function onGoingListToJobCardList(applicants: MissionsResp['items']): JobCardProps[] {
  return applicants.map(onGoingItemToJobCardAdaptor);
}

function declinedItemToJobCardAdaptor(applicant: DeclinedApplicantListResp['items'][0][0]): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function declinedListToJobCardList(applicants: DeclinedApplicantListResp['items'][0]): JobCardProps[] {
  return applicants.map(declinedItemToJobCardAdaptor);
}

function setStatusJSX(status: keyof typeof APPLICANT_STATUS) {
  const label = setApplicantStatusLabel(status);

  const pendingStyles: CSSProperties = {
    padding: '10px',
    height: '1.5rem',
    backgroundColor: 'var(--color-success-01)',
    borderRadius: '25px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--font-size-s)',
  };

  const approvedStyles: CSSProperties = {
    padding: '10px',
    height: '1.5rem',
    backgroundColor: 'var(--color-warning-01)',
    borderRadius: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--font-size-s)',
  };
  const confirmedStyles: CSSProperties = {
    padding: '10px',
    height: '1.5rem',
    backgroundColor: 'var(--color-success-01)',
    borderRadius: '25px',
    display: 'flex',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--font-size-s)',
  };
  const completedStyles: CSSProperties = {
    padding: '10px',
    height: '1.5rem',
    backgroundColor: 'var(--color-gray-04)',
    borderRadius: '25px',
    display: 'flex',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--font-size-s)',
  };

  const defaultStyle: CSSProperties = {
    padding: '10px',
    height: '1.5rem',
    backgroundColor: 'var(--color-gray-02)',
    borderRadius: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--font-size-s)',
  };

  switch (status) {
    case 'PENDING':
      return <div style={pendingStyles}>{label}</div>;
    case 'APPROVED':
      return <div style={approvedStyles}>{label}</div>;
    case 'CONFIRMED':
      return <div style={confirmedStyles}>{label}</div>;
    case 'COMPLETED':
      return <div style={completedStyles}>{label}</div>;
    default:
      return <div style={defaultStyle}>{label}</div>;
  }
}

function awaitingItemToJobCardAdaptor(applicant: GetOffer['items'][0]): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.offerer.meta.name,
    img: applicant.offerer.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
    bottomRight: setStatusJSX(applicant.status),
  };
}

function awaitingListToJobCardList(applicants: GetOffer['items']): JobCardProps[] {
  return applicants.map(awaitingItemToJobCardAdaptor);
}

function pendingItemToJobCard(applicant: UserApplicantResp): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function pendingListToJobCardList(applicants: UserApplicantResp[]): JobCardProps[] {
  return applicants.map(pendingItemToJobCard);
}
