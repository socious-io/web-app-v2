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
  image?: string;
}

export interface ServicesRes extends PaginateRes {
  items: Service[];
}
