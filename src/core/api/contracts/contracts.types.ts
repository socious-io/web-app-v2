import { PaymentCurrency, PaymentMode, ProjectPaymentType } from '../types';

export type CurrencyPayloadMap = {
  FIAT: { card_id: string };
  CRYPTO: { txid: string };
};

export type DepositReq<K extends keyof CurrencyPayloadMap> = CurrencyPayloadMap[K];

//FIXME: replace it with ContractStatus when the old one is removed
export type NewContractStatus =
  | 'CREATED'
  | 'CLIENT_APPROVED'
  | 'SIGNED'
  | 'PROVIDER_CANCELED'
  | 'CLIENT_CANCELED'
  | 'APPLIED'
  | 'COMPLETED';

//FIXME: replace it with Contract when the old one is removed
export interface NewContract {
  id: string;
  name: string;
  description: string;
  type: ProjectPaymentType;
  total_amount: number;
  currency: PaymentCurrency;
  crypto_currency: string;
  currency_rate: number;
  commitment: number;
  commitment_period: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  commitment_period_count: number;
  payment_type: PaymentMode;
  applicant_id: string;
  project_id: string;
  client_id: string;
  status: NewContractStatus;
  provider_id: string;
  payment_id: string;
  offer_id: string;
  mission_id: string;
  created_at: Date;
  updated_at: Date;
}
