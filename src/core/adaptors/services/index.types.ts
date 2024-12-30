import { PaymentMode } from 'src/core/api';

import { CurrencyDetail, PaginateRes } from '..';

export type WorkSample = {
  id: string;
  url: string;
};

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: CurrencyDetail;
  samples?: WorkSample[];
  description: string;
  hours: string;
  payment: PaymentMode;
  identity?: { id: string; type: string; name: string; username: string; usernameVal: string; img?: string };
}

export type ServicesRes = PaginateRes<Service>;

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
