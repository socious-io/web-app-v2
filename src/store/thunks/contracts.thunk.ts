import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractStatus, getContractsAdaptor, SemanticContractStatus } from 'src/core/adaptors';
import { ProjectPaymentType } from 'src/core/api';

export function getContractStatus(
  contractStatus: ContractStatus,
  isCurrentIdentityProvider: boolean,
  paymentType: ProjectPaymentType,
  hasPayment: boolean,
): SemanticContractStatus {
  let status: SemanticContractStatus = 'Canceled';
  if (isCurrentIdentityProvider) {
    switch (contractStatus) {
      case 'CREATED':
        status = 'Offer sent';
        break;
      case 'SIGNED':
        if (hasPayment) {
          status = 'Ongoing';
        } else if (paymentType === 'PAID') {
          status = 'Payment required';
        } else {
          status = 'Ongoing';
        }
        break;
      case 'PROVIDER_CANCELED':
        status = 'Canceled';
        break;
      case 'CLIENT_CANCELED':
        status = 'Withdrawn';
        break;
      case 'APPLIED':
        status = 'Awaiting confirmation';
        break;
      case 'COMPLETED':
        status = 'Completed';
        break;
    }
  } else {
    switch (contractStatus) {
      case 'CREATED':
        status = 'Offer received';
        break;
      case 'SIGNED':
        if (hasPayment) {
          status = 'Ongoing';
        } else if (paymentType === 'PAID') {
          status = 'Awaiting confirmation';
        } else {
          status = 'Ongoing';
        }
        break;
      case 'PROVIDER_CANCELED':
        status = 'Canceled';
        break;
      case 'CLIENT_CANCELED':
        status = 'Withdrawn';
        break;
      case 'APPLIED':
        status = 'Awaiting confirmation';
        break;
      case 'COMPLETED':
        status = 'Completed';
        break;
    }
  }
  return status;
}

export const getContracts = createAsyncThunk('contracts/get', async (params: { page: number; limit: number }) => {
  const { page, limit } = params;
  const { data } = await getContractsAdaptor(page, limit);
  if (data) {
    const { items: contracts, total } = data;
    return {
      contracts,
      page,
      limit,
      total,
    };
  } else return;
});

// export const getContractsByFilter = createAsyncThunk(
//   'contracts/getOngoing',
//   async (params: {
//     filter: 'ongoing' | 'archived';
//     page: number;
//     limit: number;
//     identityType: 'users' | 'organizations';
//   }) => {
//     const { page, limit, identityType, filter } = params;
//     const missions = await userMissions(undefined, {
//       page,
//       limit,
//       'filter.status': filter === 'ongoing' ? 'ACTIVE' : 'CONFIRMED,CANCELED,KICKED_OUT',
//     });

//     const contracts = missions.items.map(item => {
//       return {
//         contractStatus: getContractStatus(
//           identityType,
//           item.project.payment_type as ProjectPaymentType,
//           item.payment,
//           item.status,
//         ),
//         ...item.offer,
//         project: item.project,
//         offerer: item.assigner,
//         recipient: item.assignee,
//         organization: item.organization,
//         applicant: item.applicant,
//         amount: item.amount,
//         fee: item.fee,
//         stripe_fee: item.stripe_fee,
//         total: item.total,
//         payout: item.payout,
//         app_fee: item.app_fee,
//         mission: item,
//         escrow: item.escrow,
//         payment: item.payment,
//       };
//     });

//     return {
//       offers: contracts,
//       page,
//       limit,
//       totalCount: missions.total_count,
//     };
//   },
// );
