import { Amounts, Identity, PaymentMode, ProjectPaymentType } from 'src/core/api';

import { CurrencyDetail } from '../services/index.types';

export type ContractStatus =
  | 'CREATED'
  | 'CLIENT_APPROVED'
  | 'SIGNED'
  | 'PROVIDER_CANCELED'
  | 'CLIENT_CANCELED'
  | 'APPLIED'
  | 'COMPLETED';

export interface Contract {
  id: string;
  status: ContractStatus;
  orderId: string;
  date: string;
  name: string;
  description: string;
  price: number;
  currency: CurrencyDetail;
  payment: PaymentMode;
  amounts?: Amounts;
  type?: ProjectPaymentType;
  projectId?: string;
  client?: Identity;
  clientId?: string;
  paymentId?: string;
  provider?: Identity;
  providerId?: string;
  applicantId?: string;
  offerId?: string;
  missionId?: string;
}

export interface ContractReq {
  title: string;
  description: string;
  type: ProjectPaymentType;
  price: number;
  currency: string;
  payment: PaymentMode;
  projectId: string;
  clientId: string;
  applicantId?: string;
}

export interface SubmitReq {
  description: string;
  files?: string[];
}
