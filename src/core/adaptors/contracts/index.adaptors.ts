import { depositContract, DepositReq, PaymentMode } from 'src/core/api';
import { formatDate } from 'src/core/time';

import { AdaptorRes, Contract } from '..';

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
      //FIXME: need all statuses synced between jobs and services
      status: res.status,
      orderId: res.payment_id,
      date: formatDate(res.created_at),
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in depositing a contract', error);
    return { data: null, error: 'Error in depositing a contract' };
  }
};
