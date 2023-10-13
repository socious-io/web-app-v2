import { CSSProperties } from 'react';
import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';
import { APPLICANT_STATUS, setApplicantStatusLabel } from 'src/constants/APPLICANT_STATUS';
import { userOffers, Offer, userApplicants, Applicant, userMissions, Mission } from 'src/core/api';
import { get } from 'src/core/http';
import { toRelativeTime } from 'src/core/relative-time';
import { Pagination } from 'src/core/types';

export async function getEndedList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  const missions = await userMissions('', { status: 'COMPLETE,CONFIRMED', page: payload.page });
  const adopted = endedListToJobCardList(missions.items);
  return { ...missions, items: adopted };
}

export async function getOnGoingList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  const missions = await userMissions('', { status: 'ACTIVE', page: payload.page });
  const adopted = onGoingListToJobCardList(missions.items);
  return { ...missions, items: adopted };
}

export async function getDeclinedApplicants(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  const applicants = await userApplicants({ status: 'REJECTED', page: payload.page });
  const adopted = declinedListToJobCardList(applicants.items);
  return { ...applicants, items: adopted };
}
export async function getPendingApplicants(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  const applicants = await userApplicants({ status: 'PENDING', page: payload.page });
  const adopted = pendingListToJobCardList(applicants.items);
  return { ...applicants, items: adopted };
}

export async function getAwaitingReviewList(payload: { page: number }): Promise<Pagination<JobCardProps[]>> {
  const offers = await userOffers({ status: 'PENDING,APPROVED', page: payload.page });
  const adopted = awaitingListToJobCardList(offers.items);
  return { ...offers, items: adopted };
}

function endedItemToJobCardAdaptor(applicant: Mission): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.assigner.meta.name,
    img: applicant.assigner.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function endedListToJobCardList(applicants: Mission[]): JobCardProps[] {
  return applicants.map(endedItemToJobCardAdaptor);
}

function onGoingItemToJobCardAdaptor(applicant: Mission): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.assigner.meta.name,
    img: applicant.assigner.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function onGoingListToJobCardList(applicants: Mission[]): JobCardProps[] {
  return applicants.map(onGoingItemToJobCardAdaptor);
}

function declinedItemToJobCardAdaptor(applicant: Applicant): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function declinedListToJobCardList(applicants: Applicant[]): JobCardProps[] {
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
    default:
      return <div style={defaultStyle}>{label}</div>;
  }
}

function awaitingItemToJobCardAdaptor(applicant: Offer): JobCardProps {
  return {
    id: applicant.id,
    title: applicant.project.title,
    body: applicant.offerer.meta.name,
    img: applicant.offerer.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
    bottomRight: setStatusJSX(applicant.status),
  };
}

function awaitingListToJobCardList(applicants: Offer[]): JobCardProps[] {
  return applicants.map(awaitingItemToJobCardAdaptor);
}

function pendingItemToJobCard(applicant: Applicant): JobCardProps {
  return {
    id: applicant.project.id,
    title: applicant.project.title,
    body: applicant.organization.meta.name,
    img: applicant.organization.meta.image,
    date: `Applied ${toRelativeTime(applicant.created_at)}`,
  };
}

function pendingListToJobCardList(applicants: Applicant[]): JobCardProps[] {
  return applicants.map(pendingItemToJobCard);
}
