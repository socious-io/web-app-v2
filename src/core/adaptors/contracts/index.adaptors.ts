import {
  CommitmentPeriod,
  createContract,
  depositContract,
  DepositReq,
  PaymentMode,
  submitRequirements,
} from 'src/core/api';
import { formatDate } from 'src/core/time';
import { getSelectedTokenDetail } from 'src/dapp/dapp.service';

import { AdaptorRes, Contract, ContractReq, SubmitReq, SuccessRes } from '..';

export const createContractAdaptor = async (payload: ContractReq): Promise<AdaptorRes<Contract>> => {
  try {
    const newPayload = {
      title: payload.title,
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
      amounts: res.amounts,
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

export const submitRequirementsAdaptor = async (
  contractId: string,
  payload: SubmitReq,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      requirement_description: payload.description,
      requirement_files: payload?.files || [],
    };
    await submitRequirements(contractId, newPayload);
    return { data: { message: 'success' }, error: null };
  } catch (error) {
    console.error('Error in submitting requirements on a contract', error);
    return { data: null, error: 'Error in submitting requirements on a contract' };
  }
};
