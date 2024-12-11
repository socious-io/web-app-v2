import { Skill } from '../site/site.types';
import { PaginateRes } from '../types';

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: Skill[];
  delivery: string;
  price: string;
  currency: string;
  images?: string[];
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}

export type PaymentMode = 'FIAT' | 'CRYPTO';

export interface ServiceReq extends Omit<Service, 'skills'> {
  description: string;
  hours: string;
  payment: PaymentMode;
  skills: string[];
}
