import { Identity } from 'src/core/api';

import { PaymentCurrency, PaymentMode, ProjectPaymentType, CommitmentPeriod } from '../types';

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

export type Amounts = {
  amount: number;
  fee: number;
  app_fee: number;
  payout: number;
  stripe_fee: number;
  total: number;
};

//FIXME: replace it with Contract when the old one is removed
export interface NewContract {
  id: string;
  name: string;
  description: string;
  type: ProjectPaymentType;
  total_amount: number;
  amounts: Amounts;
  currency: PaymentCurrency;
  crypto_currency: string;
  currency_rate: number;
  commitment: number;
  commitment_period: CommitmentPeriod;
  commitment_period_count: number;
  payment_type: PaymentMode;
  applicant_id: string;
  project_id: string;
  client: Identity;
  status: NewContractStatus;
  provider: Identity;
  payment_id: string;
  offer_id: string;
  mission_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ContractReq {
  title: string;
  description: string;
  type: ProjectPaymentType;
  total_amount: number;
  currency: PaymentCurrency | string;
  crypto_currency: string;
  payment_type: PaymentMode;
  project_id: string; //service_id or job_id
  client_id: string; //buyer in services or talent in jobs
  applicant_id?: string;
  currency_rate?: number;
  commitment?: number;
  commitment_period?: CommitmentPeriod;
  commitment_period_count?: number;
}

export interface SubmitReq {
  requirement_description: string;
  requirement_files?: string[];
}
