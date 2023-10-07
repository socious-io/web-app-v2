import { Mission } from '../jobs/jobs.types';
import { Applicant, Category, Escrow, Job } from '../jobs/jobs.types';
import { Organization } from '../organizations/organizations.types';
import { Identity } from '../site/site.types';
import { LanguageCode, Media, PaymentMode, SDG, PaginateRes } from '../types';
// -------------------- Requests ----------------------

export interface ReportReq {
  comment?: string;
  blocked: boolean;
}

export interface UpdateProfileReq {
  first_name: string;
  last_name: string;
  username: string;
  bio?: string;
  mission?: string;
  language?: string;
  country?: string;
  city?: string;
  geoname_id?: number | null;
  address?: string;
  phone?: string;
  wallet_address?: string;
  avatar?: string;
  cover_image?: string;
  social_causes?: string[];
  skills?: string[];
  mobile_country_code?: string;
  certificates?: string[];
  goals?: string;
  educations?: string[];
}

export interface UpdateWalletReq {
  wallet_address: string;
}

export interface LanguageReq {
  name: LanguageCode;
  level: 'BASIC' | 'CONVERSANT' | 'PROFICIENT' | 'FLUENT' | 'NATIVE';
}

export interface ExperienceReq {
  org_id: string;
  title: string;
  description?: string;
  skills?: string[];
  start_at: string;
  end_at?: string;
}

export interface ChangePasswordReq {
  current_password: string;
  password: string;
}

export interface ChangePasswordDirectReq {
  password: string;
}

export interface DeleteUserReq {
  reason: string;
}

// -------------------- Responses ----------------------

export interface UsersRes extends PaginateRes {
  items: User[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  mission?: string;
  bio?: string;
  impact_points: number;
  skills: string[];
  followers: number;
  followings: number;
  wallet_address?: string;
  proofspace_connect_id?: string;
  phone?: string;
  address?: string;
  social_causes: string[];
  avatar?: Media;
  cover_image?: Media;
  reported: boolean;
  mobile_country_code?: string;
  open_to_work: boolean;
  open_to_volunteer: boolean;
  languages?: Language[] | null;
  experiences?: Experience[] | null;
  created_at: Date;
}

export interface Language extends LanguageReq {
  id: string;
  created_at: Date;
}

export interface Experience extends ExperienceReq {
  id: string;
  org: {
    id: string;
    name: string;
    shortname: string;
    bio?: string;
    website?: string;
  };
  created_at: Date;
}

export interface Badge {
  total_points: number;
  social_cause_category: SDG;
}
export interface Badges {
  badges: Badge[];
}

export interface ImpactPoint {
  id: string;
  job_category: {
    name: string;
  };
  mission: Mission;
  project: Job;
  created_at: Date;
  total_points: number;
  organization: Identity;
}

export interface ImpactPoints extends PaginateRes {
  items: ImpactPoint[];
}
export interface Offer {
  applicant: Applicant;
  applicant_id: string;
  assignment_total: number;
  created_at: string;
  crypto_currency_address: string;
  currency: string;
  due_date: Date | string;
  escrow: Escrow | string;
  id: string;
  job_category: Category;
  offer_message: string;
  offer_rate: string | null;
  offerer_id: string;
  offerer: Identity;
  organization: Organization;
  payment_mode: PaymentMode;
  project: Job;
  project_id: string;
  recipient: Identity;
  recipient_id: string;
  status: string;
  total_hours: number | null;
  updated_at: Date;
  weekly_limit: number;
}

export interface OfferRes extends PaginateRes {
  items: Offer[];
}
