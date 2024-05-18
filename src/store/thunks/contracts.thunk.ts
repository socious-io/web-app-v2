import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractStatus, MissionStatus, OfferStatus, ProjectPaymentType, userMissions, userOffers } from 'src/core/api';

export function getContractStatus(
  identityType: 'users' | 'organizations',
  paymentType: ProjectPaymentType,
  offerStatus: OfferStatus,
  missionStatus?: MissionStatus,
): ContractStatus {
  let status: ContractStatus = 'Closed';
  if (identityType === 'users') {
    switch (offerStatus) {
      case 'PENDING':
        status = 'Offer received';
        break;
      case 'APPROVED':
        status = 'Awaiting confirmation';
        break;
      case 'HIRED':
        status = 'Ongoing';
        break;
      case 'CANCELED':
        status = 'Canceled';
        break;
      case 'WITHDRAWN':
        status = 'Withdrawn';
        break;
      case 'CLOSED':
        if (missionStatus === 'CONFIRMED') status = 'Completed';
        else if (missionStatus === 'CANCELED') status = 'Canceled';
        else if (missionStatus === 'KICKED_OUT') status = 'Kicked out';
        else if (missionStatus === 'COMPLETE') status = 'Awaiting confirmation';
        else status = 'Closed';
        break;
    }
  } else {
    switch (offerStatus) {
      case 'PENDING':
        status = 'Offer sent';
        break;
      case 'APPROVED':
        if (paymentType === 'PAID') status = 'Payment required';
        else status = 'Awaiting confirmation';
        break;
      case 'HIRED':
        if (missionStatus === 'ACTIVE') status = 'Ongoing';
        break;
      case 'CANCELED':
        status = 'Canceled';
        break;
      case 'WITHDRAWN':
        status = 'Withdrawn';
        break;
      case 'CLOSED':
        if (missionStatus === 'CONFIRMED') status = 'Completed';
        else if (missionStatus === 'CANCELED') status = 'Canceled';
        else if (missionStatus === 'KICKED_OUT') status = 'Kicked out';
        else if (missionStatus === 'COMPLETE') status = 'Awaiting confirmation';
        else status = 'Closed';
        break;
    }
  }
  return status;
}

export const getContracts = createAsyncThunk(
  'contracts/get',
  async (params: { page: number; limit: number; identityType: 'users' | 'organizations' }) => {
    const { page, limit, identityType } = params;
    const offers = await userOffers({ page, limit });
    const contracts = offers.items.map(item => {
      return {
        ...item,
        contractStatus: getContractStatus(
          identityType,
          item.project.payment_type as ProjectPaymentType,
          item.status,
          item.mission?.status,
        ),
      };
    });
    return {
      offers: contracts,
      page,
      limit,
      totalCount: offers.total_count,
    };
  },
);

export const getContractsByFilter = createAsyncThunk(
  'contracts/getOngoing',
  async (params: {
    filter: 'ongoing' | 'archived';
    page: number;
    limit: number;
    identityType: 'users' | 'organizations';
  }) => {
    const { page, limit, identityType, filter } = params;
    const missions = await userMissions(undefined, {
      page,
      limit,
      'filter.status': filter === 'ongoing' ? 'ACTIVE' : 'CONFIRMED,CANCELED,KICKED_OUT',
    });

    const contracts = missions.items.map(item => {
      return {
        contractStatus: getContractStatus(
          identityType,
          item.project.payment_type as ProjectPaymentType,
          item.offer.status,
          item.status,
        ),
        ...item.offer,
        project: item.project,
        offerer: item.assigner,
        recipient: item.assignee,
        organization: item.organization,
        applicant: item.applicant,
        amount: item.amount,
        fee: item.fee,
        stripe_fee: item.stripe_fee,
        total: item.total,
        payout: item.payout,
        app_fee: item.app_fee,
        mission: item,
        escrow: item.escrow,
        payment: item.payment,
      };
    });

    return {
      offers: contracts,
      page,
      limit,
      totalCount: missions.total_count,
    };
  },
);
