import {
  ProjectLengthType,
  ProjectPaymentSchemeType,
  ProjectPaymentType,
  ProjectRemotePreferenceType,
  ProjectStatusType,
  ProjectType,
  SocialCauses,
  PaginateRes,
} from '../types';

// --------------- Requests -----------------------

export interface JobReq {
  title: string;
  description: string;
  remote_preference: ProjectRemotePreferenceType;
  payment_type?: ProjectPaymentType;
  payment_scheme?: ProjectPaymentSchemeType;
  payment_currency?: string | null;
  payment_range_lower?: string | null;
  payment_range_higher?: string | null;
  weekly_hours_lower?: string | null;
  weekly_hours_higher?: string | null;
  commitment_hours_lower?: string | null;
  commitment_hours_higher?: string | null;
  experience_level?: number;
  status?: ProjectStatusType;
  project_type?: ProjectType;
  project_length?: ProjectLengthType;
  skills?: string[];
  causes_tags?: SocialCauses[];
  country?: string;
  city?: string;
  geoname_id?: number | null;
  job_category_id: string;
}

export interface QuestionReq {
  question: string;
  required?: boolean;
  options?: string[];
}

// --------------- Responses -----------------------
export interface JobsRes extends PaginateRes {
  items: Job[];
}

export interface Question extends QuestionReq {
  id: string;
  created_at: Date;
}

export interface QuestionsRes {
  questions: Question[];
}

export interface Job extends JobReq {
  id: string;
  country: string;
  other_party_id?: string;
  other_party_title?: string;
  other_party_url?: string;
  job_category?: Category;
  applicants: number;
  missions: number;
  applied: boolean;
  identity_id: string;
  identity_type: string;
  identity_meta: any;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  expires_at?: Date;
}

export interface JobCategoriesRes {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  hourly_wage_dollars: number;
  created_at: Date;
  updated_at: Date;
}
