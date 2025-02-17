import { Mission } from '../jobs/jobs.types';
import { Identity } from '../site/site.types';
import { PaginateRes, PaymentCurrency, PaymentService, SuccessRes } from '../types';

export interface CardReq {
  holder_name?: string;
  token: string;
  meta?: any;
}

export interface PayReq {
  service: PaymentService;
  txHash?: string;
  source: string;
  meta?: any;
}

export interface PaymentsRes extends PaginateRes {
  items: Payment[];
}

export interface CardsRes extends PaginateRes {
  items: Card[];
}

export interface Payment {
  id: string;
  identity_id: string;
  amount: number;
  created_at: Date;
  canceled_at?: Date;
  crypto_currency_address?: string;
  currency: PaymentCurrency;
  ref_trx?: string;
  reference?: string;
  referrers_fee?: boolean;
  service: PaymentService;
  source: string;
  source_type?: string;
  transaction_id: string;
  verified_at?: Date;

  meta: {
    escrowId?: string;
    id?: string;
    offer_id: string;
    project_id: string;
    token?: string;
    txHash?: string;
  };

  payer_identity: Identity;
  receiver_identity: Identity;
  mission?: Mission;
}

export interface Card extends CardReq {
  id: string;
  created_at: Date;
}

export interface PayoutRes extends SuccessRes {
  transaction_id: string;
}

export interface TokenRes {
  rate: number;
}
