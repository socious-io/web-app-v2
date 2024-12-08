import { PaginateResV3 } from '../types';

export type Category = {
  id: string;
  name: string;
  hourly_wage_dollars: number;
  created_at: Date;
  updated_at: Date;
};

export type WorkSample = {
  filename: string;
  url: string;
  id: string;
};

export type PaymentMode = 'FIAT' | 'CRYPTO';

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
