import { PaginateRes } from 'src/core/api';

export type WorkSample = {
  id: string;
  url: string;
};

export type PaymentMode = 'FIAT' | 'CRYPTO';

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  samples?: WorkSample[];
  description?: string;
  hours?: string;
  payment?: PaymentMode;
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}
export interface ServiceReq {
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  description: string;
  hours: string;
  payment: PaymentMode;
  samples: string[];
}
