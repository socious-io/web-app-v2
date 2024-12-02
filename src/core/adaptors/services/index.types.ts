import { PaginateRes } from 'src/core/api';

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  samples?: string[];
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}
