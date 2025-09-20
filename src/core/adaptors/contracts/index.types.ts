import { Amounts, Identity, Media, Payment, PaymentMode, ProjectPaymentType } from 'src/core/api';

import { CurrencyDetail, PaginateRes } from '..';

export type ContractStatus = 'CREATED' | 'SIGNED' | 'PROVIDER_CANCELED' | 'CLIENT_CANCELED' | 'APPLIED' | 'COMPLETED';

export type SemanticContractStatus =
  | 'Offer sent'
  | 'Offer received'
  | 'Awaiting confirmation'
  | 'Payment required'
  | 'Ongoing'
  | 'Completed'
  | 'Canceled'
  | 'Withdrawn';
// | 'Kicked out'
// | 'Closed';

export type ContractFilters = 'all' | 'ongoing' | 'archived';

export interface Contract {
  id: string;
  status: ContractStatus;
  semanticStatus?: SemanticContractStatus;
  orderId?: string;
  date: string;
  name: string;
  description: string;
  price: number;
  currency: CurrencyDetail;
  payment: PaymentMode;
  amounts?: Amounts;
  updated?: string;
  type?: ProjectPaymentType;
  projectId?: string;
  client?: Identity;
  client_wallet?: {
    id: string;
    user_id: string;
    address: string;
    network: string;
    testnet: boolean;
    created_at: string;
    updated_at: string;
  };
  clientId?: string;
  paymentId?: string;
  provider?: Identity;
  providerId?: string;
  applicantId?: string;
  offerId?: string;
  missionId?: string;
  partner?: Identity;
  requirement?: string;
  file?: Media | null;
  feedback?: boolean;
  escrowId?: string;
  paymentObj?: Payment;
  crypto_network?: string;
}

export type ContractRes = PaginateRes<Contract>;

export interface ContractReq {
  name: string;
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
