import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractFilters, ContractStatus, getContractsAdaptor, SemanticContractStatus } from 'src/core/adaptors';
import { ProjectPaymentType } from 'src/core/api';

export function getContractStatus(
  contractStatus: ContractStatus,
  isCurrentIdentityProvider: boolean,
  paymentType: ProjectPaymentType,
  hasPayment: boolean,
): SemanticContractStatus {
  switch (contractStatus) {
    case 'CREATED':
      return isCurrentIdentityProvider ? 'Offer sent' : 'Offer received';
    case 'SIGNED':
      if (hasPayment) return 'Ongoing';
      if (paymentType === 'PAID') {
        return isCurrentIdentityProvider ? 'Payment required' : 'Awaiting confirmation';
      }
      return 'Ongoing';
    case 'PROVIDER_CANCELED':
      return 'Canceled';
    case 'CLIENT_CANCELED':
      return 'Withdrawn';
    case 'APPLIED':
      return 'Awaiting confirmation';
    case 'COMPLETED':
      return 'Completed';
    default:
      return 'Canceled';
  }
}

export const getContracts = createAsyncThunk(
  'contracts/get',
  async (params: { page: number; limit: number; filters?: { status: ContractFilters } }) => {
    const { page, limit, filters } = params;
    const statusFilters = {
      all: '',
      ongoing: 'SIGNED',
      archived: 'CLIENT_CANCELED,PROVIDER_CANCELED,COMPLETED',
    }[filters?.status || ''];

    const { data } = await getContractsAdaptor(page, limit, statusFilters && { status: statusFilters });
    if (data) {
      const { items: contracts, total } = data;
      return {
        contracts,
        page,
        limit,
        total,
      };
    } else return;
  },
);
