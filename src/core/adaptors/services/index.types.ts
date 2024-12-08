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
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}

export type PaymentMode = 'FIAT' | 'CRYPTO';

export interface ServiceReq extends Omit<Service, 'id'> {
  description: string;
  hours: string;
  payment: PaymentMode;
}
