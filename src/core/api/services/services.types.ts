import { PaginateRes } from '../types';

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
  payment_range_lower: string;
  payment_range_higher: string;
  work_samples: WorkSample[];
  kind: 'SERVICE';
}

export interface ServicesRes extends PaginateRes {
  results: Service[];
}
