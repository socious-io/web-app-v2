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
  amount: number;
  currency: PaymentCurrency;
  service: PaymentService;
  transaction_id: string;
  source: string;
  verified_at?: Date;
  created_at: Date;
}

export interface Card extends CardReq {
  id: string;
  created_at: Date;
}

export interface PayoutRes extends SuccessRes {
  transaction_id: string;
}
