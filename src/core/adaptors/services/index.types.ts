import { PaginateRes } from 'src/core/api';

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  images?: string[];
  account?: { id: string; type: string; name: string; username: string; img?: string };
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}

export type PaymentMode = 'FIAT' | 'CRYPTO';

export interface ServiceReq extends Omit<Service, 'id'> {
  id?: string;
  description: string;
  hours: string;
  payment: PaymentMode;
}
