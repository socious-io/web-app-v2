import { CommitmentPeriod, contracts, createContract, depositContract, DepositReq, PaymentMode } from 'src/core/api';
import { formatDate } from 'src/core/time';
import { getSelectedTokenDetail } from 'src/dapp/dapp.service';
import store from 'src/store';
import { getContractStatus } from 'src/store/thunks/contracts.thunk';

import { AdaptorRes, Contract, ContractReq, ContractRes } from '..';

export const getContractsAdaptor = async (
  page = 1,
  limit = 10,
  filters?: Record<string, string>,
): Promise<AdaptorRes<ContractRes>> => {
  const currentIdentity = store.getState().identity.entities.find(identity => identity.current);
  const currentIdentityId = currentIdentity?.id;
  try {
    const { results, total } = await contracts({ page, limit }, filters);
    const items = results?.length
      ? results.map(contract => ({
          id: contract.id,
          status: contract.status,
          semanticStatus: getContractStatus(
            contract.status,
            currentIdentityId === contract.provider.id,
            contract.type,
            !!contract.payment_id,
          ),
          orderId: contract.payment_id,
          date: contract.created_at.toString(),
          name: contract.name,
          description: contract.description,
          type: contract.type || 'PAID',
          price: contract.total_amount,
          currency:
            contract.payment_type === 'CRYPTO'
              ? getSelectedTokenDetail(contract.crypto_currency)
              : { name: contract.currency },
          payment: contract.payment_type,
          client: contract.client,
          clientId: contract.client.id,
          paymentId: contract.payment_id,
          provider: contract.provider,
          providerId: contract.provider.id,
          offerId: contract.offer_id,
          missionId: contract.mission_id,
          partner: currentIdentityId === contract.provider.id ? contract.client : contract.provider,
        }))
      : [];
    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting contracts List: ', error);
    return { data: null, error: 'Error in getting contracts List' };
  }
};

export const createContractAdaptor = async (payload: ContractReq): Promise<AdaptorRes<Contract>> => {
  try {
    const newPayload = {
      name: payload.name,
      description: payload.description,
      type: payload.type,
      total_amount: payload.price,
      //FIXME: remove default value for currency on payment CRYPTO on BE
      currency: payload.payment === 'FIAT' ? payload.currency : 'USD',
      crypto_currency: payload.payment === 'CRYPTO' ? payload.currency : '',
      payment_type: payload.payment,
      project_id: payload.projectId,
      client_id: payload.clientId,
      commitment_period: 'MONTHLY' as CommitmentPeriod, //default for services
    };
    const res = await createContract(newPayload);
    const data = {
      id: res.id,
      status: res.status,
      orderId: res.payment_id,
      date: res.created_at.toString(),
      name: res.name,
      description: res.description,
      price: res.total_amount,
      currency: res.payment_type === 'CRYPTO' ? getSelectedTokenDetail(res.crypto_currency) : { name: res.currency },
      payment: res.payment_type,
      client: res.client,
      provider: res.provider,
      projectId: res.project_id,
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in creating a contract', error);
    return { data: null, error: 'Error in creating a contract' };
  }
};

export const depositContractAdaptor = async (
  contractId: string,
  identifier: string,
  currency: PaymentMode,
): Promise<AdaptorRes<Contract>> => {
  const currentIdentity = store.getState().identity.entities.find(identity => identity.current);
  const currentIdentityId = currentIdentity?.id;
  try {
    const res = await depositContract(
      contractId,
      currency === 'FIAT'
        ? ({ card_id: identifier } as DepositReq<'FIAT'>)
        : ({ txid: identifier } as DepositReq<'CRYPTO'>),
    );
    const data = {
      id: res.id,
      status: res.status,
      semanticStatus: getContractStatus(res.status, currentIdentityId === res.provider.id, res.type, !!res.payment_id),
      orderId: res.payment_id,
      date: formatDate(res.created_at),
      name: res.name,
      description: res.description,
      price: res.total_amount,
      currency: res.payment_type === 'CRYPTO' ? getSelectedTokenDetail(res.crypto_currency) : { name: res.currency },
      payment: res.payment_type,
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in depositing a contract', error);
    return { data: null, error: 'Error in depositing a contract' };
  }
};
