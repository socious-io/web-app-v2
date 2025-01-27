import { Category, Identity } from '..';
import { PaginateResV3, PaymentMode } from '../types';

export type WorkSample = {
  filename: string;
  url: string;
  id: string;
};

export interface Service {
  id: string;
  title: string;
  description: string;
  payment_currency: string;
  skills: string[];
  job_category_id: string;
  job_category: Category;
  project_length: string;
  commitment_hours_lower: string;
  commitment_hours_higher: string;
  payment_mode: PaymentMode;
  payment_range_lower: string;
  payment_range_higher: string;
  work_samples: WorkSample[];
  kind: 'SERVICE';
  identity: Identity;
}

export type ServicesRes = PaginateResV3<Service>;

export interface ServiceReq {
  title: string;
  description: string;
  payment_currency: string;
  skills: string[];
  job_category_id: string;
  project_length: string;
  commitment_hours_lower: string;
  commitment_hours_higher: string;
  payment_mode: PaymentMode;
  payment_range_lower: string;
  payment_range_higher: string;
  work_samples: string[];
  kind: 'SERVICE';
}

export interface ServiceSearchRes {
  id: string;
  title: string;
  description: string;
  payment_currency: string;
  skills: string[];
  job_category_id: string;
  project_length: string;
  commitment_hours_lower: string;
  commitment_hours_higher: string;
  payment_mode: PaymentMode;
  payment_range_lower: string;
  payment_range_higher: string;
  work_samples: Array<{ id: string; url: string }>;
  identity_meta: any;
}
