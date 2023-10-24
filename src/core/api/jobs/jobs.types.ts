import { Currency } from 'iso-country-currency';

import { Organization } from '../organizations/organizations.types';
import { Payment } from '../payments/payments.types';
import { Identity } from '../site/site.types';
import {
  ProjectLengthType,
  ProjectPaymentSchemeType,
  ProjectPaymentType,
  ProjectRemotePreferenceType,
  ProjectStatusType,
  ProjectType,
  SocialCauses,
  PaginateRes,
  ApplicantStatus,
  MissionStatus,
  PaymentMode,
  OfferStatus,
} from '../types';
import { User } from '../users/users.types';

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

export interface ApplyReq {
  cover_letter: string;
  cv_link: string;
  cv_name: string;
  share_contact_info: boolean;
  answers?: Answer[];
}

export interface OfferReq {
  payment_mode?: PaymentMode;
  offer_rate?: number;
  offer_message: string;
  due_date?: string;
  assignment_total: number;
  weekly_limit?: number;
  total_hours?: number;
  currency?: Currency;
  crypto_currency_address?: string;
}

export interface Answer {
  id: string;
  answer: string;
  selected_option?: number;
}

export interface HourlyWorkReq {
  total_hours: number;
  start_at: Date;
  end_at: Date;
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

export interface OffersRes extends PaginateRes {
  items: Offer[];
}

export interface MissionsRes extends PaginateRes {
  items: Mission[];
}

export interface ApplicantsRes extends PaginateRes {
  items: Applicant[];
}

export interface HourlyWork extends HourlyWorkReq {
  id: string;
  created_at: Date;
}

export interface Applicant {
  id: string;
  cover_letter: string;
  status: ApplicantStatus;
  cv_link?: string;
  cv_name?: string;
  share_contact_info?: boolean;
  attachment?: string;

  user: User;
  project: Job;
  organization: Organization;

  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
}

export interface Offer extends OfferReq {
  id: string;
  status: OfferStatus;
  job_category: Category;
  project: Job;
  offerer: Identity;
  recipient: Identity;
  organization: Organization;
  applicant?: Applicant;
  created_at: Date;
  updated_at: Date;
}

export interface Mission {
  id: string;
  status: MissionStatus;
  job_category: Category;
  applicant?: Applicant;
  project: Job;
  assignee: Identity;
  assigner: Identity;
  escrow: Escrow;
  payment: Payment;
  organization: Organization;
  offer: Offer;
  user_feedback?: any;
  org_feedback?: any;
  submitted_works?: HourlyWork[];

  amount: number;
  fee: number;
  stripe_fee: number;
  total: number;
  payout: number;
  app_fee: number;

  created_at: Date;
  complete_at?: Date;
  updated_at: Date;
}

export interface Escrow {
  id: string;
  amount: number;
  currency?: Currency;
  created_at: Date;
  released_at?: Date;
  refound_at?: Date;
  release_id?: string;
}
